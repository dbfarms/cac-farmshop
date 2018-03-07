class CurrentUserController < ApplicationController

    def show
      #byebug
      # action_dispatch.request_id # "08d35755-5679-4a1b-8bfb-f8078314055e"
      # secret="08b1577a9ceb9c62ed518b00c94533057ba527f1e6c7a1e69b2bee88329f26dfd27face2ae020409676c57ad3c85d45862580aee40c9dc99a20da6424a6b494e"
      if request.env["HTTP_AUTHORIZATION"]
        byebug
      end 
      render json: current_user, root: "user", adapter: :json
    end
  end