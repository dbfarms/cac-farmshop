class SessionsController < ApplicationController

    skip_before_action :authenticate
  
    def create #possible break point if auth_params need adjustment
      user = User.find_by(email: auth_params[:email])
      if user.authenticate(auth_params[:password])
        jwt = Auth.issue({user: user.id})
        render json: {jwt: jwt}
      else
      end
    end
  
    private
      def auth_params
        params.require(:auth).permit(:email, :password)
      end
end 