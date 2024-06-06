class User < ApplicationRecord
    # パスワードをハッシュ化
    has_secure_password

    # メールアドレスのバリデーションを追加
    validates :email, presence: true, uniqueness: { case_sensitive: false }    
end
