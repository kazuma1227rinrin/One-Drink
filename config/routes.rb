Rails.application.routes.draw do
  # drinkコントローラのcreateアクションへのルーティング
  post 'drink/:user_id', to: 'drink#create'
  
  # drinkコントローラのshowアクションへのルーティング
  get 'drink/:user_id', to: 'drink#show'

  # drinkコントローラのshowアクションへのルーティング
  get 'custom/:user_id', to: 'customs#showCustom'  

  # DrinksControllerに対する新しいルートを追加
  post 'drinks/update_drink_result/:user_id', to: 'customs#update_drink_result'

  # 新しいAPIエンドポイントのルート設定
  get 'drinks/history/:user_id', to: 'drink#drink_history'  

  # 履歴画面からカスタム画面に飛ぶときにカスタムをDBから取得する際
  get 'drinks/:id', to: 'customs#showCustomFromHistory'  

  # ドリンクのカスタム情報を更新するためのルーティング
  post 'drinks/update/:id', to: 'customs#update_custom'

  # ドリンクのコメントを編集するためのルーティング
  get 'comment/:id', to: 'comment#show_comment'

  # ドリンクのコメントを更新するためのルーティング
  post 'update_comment/:id', to: 'comment#update_comment'

  # サインアップ時のルーティング
  post 'signup', to: 'users#create'

  # メールアドレスからユーザIDを取得するためのルーティング
  get 'find_user_id', to: 'users#find_user_id'  
end
