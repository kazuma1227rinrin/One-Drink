Rails.application.routes.draw do
  
  post 'analysis', to: 'analyze#create'
  
end