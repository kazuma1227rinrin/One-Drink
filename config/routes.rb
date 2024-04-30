Rails.application.routes.draw do
  # drinkコントローラのcreateアクションへのルーティング
  post 'drink', to: 'drink#create'
  
  # drinkコントローラのshowアクションへのルーティング
  # 例: GET /drink/1
  get 'drink/:user_id', to: 'drink#show'

  # drinkコントローラのshowアクションへのルーティング
  # 例: GET /custom/1
  get 'custom/:user_id', to: 'drink#showCustom'  

  # DrinksControllerに対する新しいルートを追加
  post 'drinks/update_drink_result', to: 'drink#update_drink_result'

  # 新しいAPIエンドポイントのルート設定
  get 'drinks/history/:user_id', to: 'drink#drink_history'  

  # 履歴画面からカスタム画面に飛ぶときにカスタムをDBから取得する際
  # get 'drinks/history/customs/:id', to: 'drink#showCustomFromHistory'  
  get 'drinks/:id', to: 'drink#showCustomFromHistory'  

  # ドリンクのカスタム情報を更新するためのルーティング
  post 'drinks/update/:id', to: 'drink#update_custom'

  # ドリンクのコメントを編集するためのルーティング
  get 'comment/:id', to: 'drink#show_comment'

  # ドリンクのコメントを更新するためのルーティング
  post 'update_comment/:id', to: 'drink#update_comment'

  # サインアップ時のルーティング
  post '/signup', to: 'users#create'
end
