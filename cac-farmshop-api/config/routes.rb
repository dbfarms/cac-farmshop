Rails.application.routes.draw do

  get '/users/current-user', to: "current_user#show"
  #post '/users/current-user-id', to: "current_user#id"
  
  post '/login', to: "sessions#create"
  get '/session', to: "sessions#user_current"
  get '/currentuser', to: "application#current_user"
  #get '/api/users', to: "users"
  #resources :sessions, only: [:show]
  post '/users/authorized' 

  #get 'customer/:id', to: "api/line_items#customer_line_items"
  
  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
    resources :days
    resources :users
    resources :customer_users 
    resources :line_items
    resources :orders 
 end

end
