Rails.application.routes.draw do

  get '/users/current-user', to: "current_user#show"
  resources :users
  post '/login', to: "sessions#create"

  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
    resources :days
 end

end
