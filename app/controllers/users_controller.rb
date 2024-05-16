class UsersController < ApplicationController
    
    # ユーザアカウント新規作成
    def create
      user = User.new(user_params)
      
      if user.save
        render json: { status: 'User created successfully' }, status: :created
      else
        # より具体的なエラーメッセージを返すように変更
        render json: { errors: user.errors.full_messages, code: 400 }, status: :bad_request
      end
    end

    # メールアドレスからユーザIDを取得
    def find_user_id
      user = User.find_by(email: params[:email])
      
      if user
        render json: { id: user.id, name: user.name }, status: :ok
      else
        # Firebaseのエラーコードフォーマットを使用
        render json: { error: user.errors.full_messages, code: 'auth/user-not-found' }, status: :not_found
      end
    end
    
      private
    
    # 入力フォームで取得したパラメータ受け取り
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end
end
