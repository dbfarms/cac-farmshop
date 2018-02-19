class ApplicationController < ActionController::API
    respond_to :html, :json
    before_action :debug 

    def debug
        #byebug 
    end
    #respond_to :json
    #acts_as_token_authentication_handler_for User, fallback: :exception
end
