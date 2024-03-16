Rails.application.routes.draw do
  
  post 'analysis', to: 'analyze#create'
  get 'analysis', to: 'analyze#create'
  
end