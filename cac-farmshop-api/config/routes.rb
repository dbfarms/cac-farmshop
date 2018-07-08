Rails.application.routes.draw do

  get '/users/current-user', to: "current_user#show"
  
  post '/login', to: "sessions#create"
  get '/session', to: "sessions#user_current"
  get '/currentuser', to: "application#current_user"
  post '/users/authorized' 

  
  namespace :api do
    resources :carts
    resources :categories
    resources :farmers do
      resources :farmgoods, only: [:index, :show]
    end 
    resources :farmgoods
    resources :days
    resources :users
    resources :customer_users 
    resources :line_items
    resources :orders 
    resources :farmer_orders 
    resources :farmer_line_items
 end

end
