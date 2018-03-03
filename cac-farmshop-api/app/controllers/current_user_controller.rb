class CurrentUserController < ApplicationController

    def show
      byebug 
      if request.env["HTTP_AUTHORIZATION"]
        byebug
      end 
      render json: current_user, root: "user", adapter: :json
    end
  end