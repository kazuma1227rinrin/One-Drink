Rails.application.routes.draw do
  # drinkコントローラのcreateアクションへのルーティング
  post 'drink', to: 'drink#create'
  
  # drinkコントローラのshowアクションへのルーティング
  # 例: GET /drink/1
  get 'drink/:user_id', to: 'drink#show'
end
