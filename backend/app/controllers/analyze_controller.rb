require 'net/http'
require 'json'

class AnalyzeController < ApplicationController
    # skip_before_action :verify_authenticity_token, only: [:create]
  
    def create

        # コンソールで値確認
        puts "Received parameters: #{params.inspect}"
      
        # フロントエンドから送信されたデータを受け取る
        budget = params[:budget].to_i
        has_not_caffeine = params[:hasNotCaffeine]
        feeling = params[:feeling]
        commitment = params[:commitment]
        drink_size = params[:drinkSize]
  
        # # 受け取ったデータをもとに何らかの分析を行う（ここではダミーのレスポンスを返す）
        # analysis_result = "Analysis conditions : #{budget}, #{has_not_caffeine}, #{feeling}, #{commitment}, #{drink_size}"
    
        # # 分析結果をJSONとしてフロントエンドに返す
        # render json: { result: analysis_result }

        # APIから商品データを取得
        url = URI('https://product.starbucks.co.jp/api/category-product-list/beverage/index.json')
        response = Net::HTTP.get(url)
        # 取得したデータをRubyのハッシュに変換
        products = JSON.parse(response)

        # フィルタリング処理
        filtered_products = products.select do |product|
            # 価格が予算内であるかのチェック(当然0以上)
            product["price"] <= budget && product["price"] > 0 &&
            # has_not_caffeineがtrueの場合、商品の全テキストデータに「カフェインレス」が含まれているかをチェック
            (!has_not_caffeine || product.values.any? do |value|
                value_str = value.to_s
                value_str.include?("カフェインレス") || value_str.include?("ディカフェ") || value_str.include?("ノンカフェイン")
            end)
        end

        # 条件に合う商品のidを抽出
        eligible_product_ids = filtered_products.map { |product| product["id"] }

        # 条件に合う商品がない場合の処理
        if eligible_product_ids.empty?
        render json: { error: '条件に合う商品が見つかりませんでした。' } and return
        end

        # ランダムに1つの商品idを選択
        selected_product_id = eligible_product_ids.sample

        # 選択した商品のデータを取得
        selected_product = filtered_products.find { |product| product["id"] == selected_product_id }
        # 選択した商品の名前と画像URLを取得
        selected_product_name = selected_product["product_name"]
        selected_product_image = selected_product["image1"]

        # 選択した商品の名前、画像URLを含む情報をフロントエンドに返す
        render json: { product_name: selected_product_name, image_url: selected_product_image }
    end
  end