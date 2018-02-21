Rails.application.routes.draw do

  post '/login', to: "sessions#create"
  #root 'home#index'

  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
    resources :days
 end

end
