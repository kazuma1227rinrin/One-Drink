class CustomsController < ApplicationController
    
    # カスタム画面にカスタムをセットするメソッド
    def showCustom
        # パラメータからuser_idを取得
        user_id = params[:user_id]

        # user_idに一致し、最新のレコードを取得
        drink_log = DrinkResultLog.where(user_id: user_id).order(created_at: :desc).first  

        # Customsテーブルからすべてのレコードを取得
        customs = Custom.all        

        # 取得したレコードが存在する場合は、そのデータをJSON形式で返す
        if drink_log
            render json: {
            image: drink_log.image,
            drink_name: drink_log.drink_name,
            size: drink_log.size, 
            customs: customs
            }
        else
            render json: { error: "Data not found" }, status: :not_found
        end        
    end 

    # カスタム画面からカスタムをドリンクにセットするメソッド
    def update_drink_result
        user_id = params[:user_id] # ユーザーIDをパラメータから取得
        custom_ids = params[:custom_ids] # カスタムIDの配列をパラメータから取得
    
        # 最新のdrink_result_logsのレコードを取得してis_drank_flgを1に更新
        latest_drink_result = DrinkResultLog.where(user_id: user_id).order(id: :desc).first
        if latest_drink_result.update(is_drank_flg: 1)
          # カスタムIDごとにcustom_drank_logsにレコードを作成
          custom_ids.each do |custom_id|
            CustomDrankLog.create(drink_result_log_id: latest_drink_result.id, custom_id: custom_id)
          end
          render json: { status: 'success' }
        else
          render json: { status: 'error', message: 'Update failed' }
        end
    end     
    
    # カスタム画面from履歴画面にカスタムをセットするメソッド
    def showCustomFromHistory

        # ドリンクの情報を取得
        drink = DrinkResultLog.find(params[:id]) #@いるかも #いらなさそう
        
        customs = drink.customs

        # Customsテーブルからすべてのレコードを取得
        allCustoms = Custom.all      

        # JSONとしてフロントエンドに渡すデータを構成(ここまで取れていることを確認した)
        response_data = {
            drink: drink,
            customs: customs,
            allCustoms: allCustoms
        }

        render json: response_data
    end    
    
    # カスタム画面from履歴画面にてセットしたカスタムを更新するメソッド
    def update_custom
        drink = DrinkResultLog.find(params[:id])

        # トランザクションを開始
        ActiveRecord::Base.transaction do
            drink.custom_drank_logs.destroy_all # 既存のカスタムログを一括削除

            params[:custom_ids].each do |custom_id|
            custom = Custom.find_by(id: custom_id)
            raise ActiveRecord::RecordNotFound, "Custom with ID #{custom_id} does not exist." unless custom

            CustomDrankLog.create!(
                drink_result_log_id: drink.id,
                custom_id: custom.id
            )
            end
        end
    
        render json: { status: 'success' }
      rescue => e
        render json: { status: 'error', message: e.message }
    end     
end
