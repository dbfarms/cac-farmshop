Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }

  #root 'home#index'

  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
    resources :days
 end

end
