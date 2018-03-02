Rails.application.routes.draw do

  get '/users/current-user', to: "current_user#show"
  resources :users
  post '/login', to: "sessions#create"
  #resources :sessions, only: [:show]

  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
    resources :days
 end

end
