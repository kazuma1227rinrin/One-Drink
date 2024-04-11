Rails.application.routes.draw do
  # drinkコントローラのcreateアクションへのルーティング
  post 'drink', to: 'drink#create'
  
  # drinkコントローラのshowアクションへのルーティング
  # 例: GET /drink/1
  get 'drink/:user_id', to: 'drink#show'

  # drinkコントローラのshowアクションへのルーティング
  # 例: GET /custom/1
  get 'custom/:user_id', to: 'drink#showCustom'  
end
