Rails.application.routes.draw do
  namespace :api do
    resources :carts
    resources :farmers
    resources :farmgoods
 end

end
