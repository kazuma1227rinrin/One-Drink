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
end
