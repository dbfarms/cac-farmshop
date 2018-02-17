Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
    resources :days
 end

end
