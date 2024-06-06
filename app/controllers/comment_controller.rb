class CommentController < ApplicationController
    # コメントを表示するメソッド
    def show_comment
        drink_result_log = DrinkResultLog.includes(:customs).find_by(id: params[:id])

        if drink_result_log
          # ドリンク結果が存在すれば、詳細情報を返す
          drink_details = {
            image: drink_result_log.image,
            drink_name: drink_result_log.drink_name,
            size: drink_result_log.size, 
            comment: drink_result_log.comment,
            customs: drink_result_log.customs.map { |custom| { id: custom.id, name: custom.name } }
          }
          render json: drink_details
        else
          # ドリンク結果が見つからない場合はエラーメッセージを返す
          render json: { status: 'error', message: 'Drink result not found' }, status: :not_found
        end
    end   
    
    # コメントを更新するメソッド
    def update_comment
        drink_result_log = DrinkResultLog.find_by(id: params[:id])

        if drink_result_log.nil?
          render json: { status: 'error', message: 'Drink result not found' }, status: :not_found
          return
        end
    
        if drink_result_log.update(comment: params[:comment])
          render json: { status: 'success', message: 'Comment updated successfully' }
        else
          render json: { status: 'error', message: 'Failed to update comment', errors: drink_result_log.errors.full_messages }, status: :unprocessable_entity
        end        
    end    
end
