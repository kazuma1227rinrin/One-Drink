require 'net/http'
require 'json'

class DrinkController < ApplicationController
  
    # 商品を絞って診断結果ログテーブルに登録するメソッド
    def create

        user_id = params[:user_id] if params[:user_id]
        
        # フロントエンドから送信されたデータを受け取る
        budget = params[:budget].to_i
        has_not_caffeine = params[:hasNotCaffeine]
        feeling = params[:feeling]
        commitment = params[:commitment]
        drink_size = params[:drinkSize]&.upcase       

        # API(カテゴリ)から商品データを取得
        url = URI('https://product.starbucks.co.jp/api/category-product-list/beverage/index.json')
        response = Net::HTTP.get(url)
        # 取得したデータをRubyのハッシュに変換
        products = JSON.parse(response)

        # API2(栄養)から商品データを取得
        url2 = URI('https://product.starbucks.co.jp/allergy/json/nutritions.json')
        response2 = Net::HTTP.get(url2)
        # 取得したデータをRubyのハッシュに変換
        products2 = JSON.parse(response2)        

        # --------------------予算、カフェインでの絞り込み--------------------
        # フィルタリング処理
        filtered_products = products.select do |product|
            # 価格が予算内かつ0以上、かつ指定されたcup_sizeに合致するかのチェック
            product["price"] <= budget && product["price"] > 0 &&
            # product["cup_size"] == drink_size_num &&
            # has_not_caffeineがtrueの場合、商品の全テキストデータに「カフェインレス」が含まれているかをチェック
            (!has_not_caffeine || product.values.any? do |value|
                value_str = value.to_s
                value_str.include?("カフェインレス") || value_str.include?("ディカフェ") || value_str.include?("ノンカフェイン")
            end)
        end

        # 条件に合う商品のidを抽出
        eligible_product_ids = filtered_products.map { |product| product["product_code"] }

        # 条件に合う商品がない場合の処理
        if eligible_product_ids.empty?
        render json: { error: '条件に合う商品が見つかりませんでした。' } and return
        end

        # 対象の商品データを格納する配列
        matched_products = []

        # APIデータをイテレートし、条件に一致するデータを探す
        # IDから栄養APIのデータを取得する
        products2["STARBUCKS"]["beverage"].each do |_kbn, data|
            data["categories"].each do |_category_code, category_data|
                category_data["menu_groups"].each do |group|
                    # eligible_product_idsに含まれるurl_jan_codeを持つ商品を検索
                    if eligible_product_ids.include?(group["url_jan_code"])
                        matched_products << group
                    end
                end
            end
        end

        # 条件に合う商品をフィルタリング
        real_drink = matched_products.select do |product|
            # 条件に合致する_nutrition_by_milkの要素をフィルタリング
            valid_nutrition_items = product["nutrition_by_milk"][drink_size]&.select do |item|
            item["_milk_type"].nil? || item["_milk_type"] == "milk"
            end || []
        
            # feelingに基づくフィルタリング
            feeling_condition = case feeling
                                when 'refresh'
                                !product["product_name_ja"].include?("ホット")
                                when 'focus'
                                if has_not_caffeine
                                    valid_nutrition_items.any? { |nut| nut["sugar"].to_f <= 40.0 }
                                else
                                    valid_nutrition_items.any? { |nut| nut["caffeine"].to_f >= 150.0 }
                                end
                                # when 'relax'
                                #   product["product_name_ja"].include?("ホット")
                                else
                                true
                                end
        
            # commitmentに基づくフィルタリング
            commitment_condition = case commitment
                                when 'lowCalorie'
                                    valid_nutrition_items.any? { |nut| nut["calory"].to_f <= 50.0 }
                                when 'protein'
                                    valid_nutrition_items.any? { |nut| nut["protein"].to_f >= 10.0 }
                                else
                                    true
                                end
        
            # feelingとcommitmentの両条件を満たす場合にtrue
            feeling_condition && commitment_condition
        end

        # 条件に合う商品がない場合の処理
        if real_drink.empty?
            render json: { error: '真の商品は見つかりませんでした。再診断してください。' }, status: :unprocessable_entity and return
        end

        # 最後の一品が入った配列
        final_choice = real_drink.sample
        # そのID
        final_choice_id = final_choice["url_jan_code"]

        # ----------IDからドリンク名、商品説明、商品画像を取得する----------
        matched_product = products.find { |product| product["product_code"] == final_choice_id }
        product_name = matched_product["product_name"]
        product_note = matched_product["product_note"]
        image_url = matched_product["image1"]                
        # ----------------------------------------------------------


        # ----------決まった1品からそれぞれの栄養素を取得する----------
        # APIデータから一致するurl_jan_codeを持つ商品データを探す
        matched_product2 = products2["STARBUCKS"]["beverage"].values.flat_map do |kbn|
            kbn["categories"].values.flat_map do |category|
            category["menu_groups"].find { |group| group["url_jan_code"] == final_choice_id }
            end
        end.compact.first
        
        # 指定されたサイズに基づいて栄養情報を取得
        nutrition_info = matched_product2["nutrition_by_milk"][drink_size].first

        # 不要文字列除去メソッドを適用
        clean_product_name = clean_text(matched_product["product_name"])
        clean_product_note = clean_text(matched_product["product_note"])
        
        # calory、protein、sugarの値を取得
        calory = nutrition_info["calory"]
        protein = nutrition_info["protein"]
        sugar = nutrition_info["sugar"]
        # ----------DBに登録する処理----------
        # DrinkResultLogインスタンスの作成と属性の設定
        drink_result_log = DrinkResultLog.new(
            user_id: user_id,
            drink_name: clean_product_name,
            calorie: calory,
            protein: protein,
            sugar: sugar,
            description: clean_product_note,
            image: image_url,
            size: drink_size
        )

        # データベースに保存
        if drink_result_log.save
            puts "DrinkResultLog saved successfully."
        else
            puts "Failed to save DrinkResultLog: #{drink_result_log.errors.full_messages.join(", ")}"
        end        
        
        # 取れた値をフロントエンドに返す
        render json: { 栄養APIのデータ: real_drink}
        
    end

    # 商標マークを文字列から除去
    def clean_text(text)
        text.gsub('&reg;', '')
    end    

    # *******************************************************************
    
    def show
        # パラメータからuser_idを取得
        user_id = params[:id]
        puts "Received user_id: #{user_id}"
    
        # user_idに一致し、最新のレコードを取得
        drink_log = DrinkResultLog.where(user_id: user_id).order(created_at: :desc).first  

        # 取得したレコードが存在する場合は、そのデータをJSON形式で返す
        if drink_log
            render json: {
            image: drink_log.image,
            drink_name: drink_log.drink_name,
            size: drink_log.size,
            description: drink_log.description,
            calorie: drink_log.calorie,
            protein: drink_log.protein,
            sugar: drink_log.sugar
            }
        else
            render json: { error: "Data not found" }, status: :not_found
        end
    end

    # *******************************************************************

    def drink_history
        # 現在ログインしているユーザーのidを取得
        user_id = params[:user_id]

        # is_drank_flgが1になっているdrink_result_logsを取得
        drink_results = DrinkResultLog.includes(custom_drank_logs: :custom)
                                        .where(user_id: user_id, is_drank_flg: 1)
                                        .order(id: :desc)

        # 必要なデータのみを選択してJSON形式で返す
        drinks_data = drink_results.map do |drink|
            custom_names = drink.custom_drank_logs.map do |cdl|
                # Customが存在しない場合に備えてnilチェックを行う
                cdl.custom ? cdl.custom.name : "-"
            end
            {
                id: drink.id,
                image: drink.image,
                name: drink.drink_name,
                size: drink.size,
                customs: custom_names,
                calories: drink.calorie, 
                protein: drink.protein,
                description: drink.description || "(なし)" ,
                comments: drink.comment.presence || "***" ,
                isFavoriteFlg: drink.is_favorite_flg
            }
        end

        render json: drinks_data  
    end  

    # *******************************************************************

    # ドリンクの履歴を削除するメソッド
    def destroy
        drink_result_log = DrinkResultLog.find_by(id: params[:id])
    
        if drink_result_log
          drink_result_log.destroy
          render json: { message: "Drink deleted successfully" }, status: :ok
        else
          render json: { error: "Drink not found" }, status: :not_found
        end
      rescue ActiveRecord::RecordNotDestroyed => e
        render json: { error: e.message }, status: :unprocessable_entity
    end

    # *******************************************************************

    # ドリンクのお気に入り切り替えメソッド
    def favorite
        drink = DrinkResultLog.find_by(id: params[:id])
    
        if drink
            drink.update(is_favorite_flg: params[:isFavorite])
            if drink.save
                render json: { status: 'success', message: 'お気に入り状態が更新されました。' }
            else
                render json: { status: 'error', message: 'お気に入り状態の更新に失敗しました。' }, status: :unprocessable_entity
            end
        else
            render json: { status: 'error', message: '指定されたドリンクが見つかりません。' }, status: :not_found
        end
    end

end