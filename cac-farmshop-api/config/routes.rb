Rails.application.routes.draw do

  get '/users/current-user', to: "current_user#show"
  #post '/users/current-user-id', to: "current_user#id"
  resources :users
  post '/login', to: "sessions#create"
  get '/session', to: "sessions#user_current"
  get '/currentuser', to: "application#current_user"
  #resources :sessions, only: [:show]
  post '/users/authorized' 
  
  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
    resources :days
 end

end
