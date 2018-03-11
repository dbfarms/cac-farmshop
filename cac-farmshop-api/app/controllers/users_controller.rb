class UsersController < ApplicationController
    include ErrorSerializer
    #before_action :authenticate, only: [:index] PROBABLY NEED TO MAKE USERS INFORMATION SECRET...
    #skip_before_action :authenticate #, only: [:create]
    #LIB/AUTH.RB NEEDS TO BE REPAIRED NEXT TIME GIT GETS FUCKED UP
  
    def index
      #byebug
      #CHECK AUTHORIZATION HERE NOT JUST JUST AUTHENTICATION
      render json: User.all
    end

    def authorized 
      user = Auth.decode(params["_json"])
      render json: user 
      #byebug 
    end 
  
    def show
      render json: User.find(params[:id])
    end
  
    def create
      byebug
      user = User.new(user_params)
      #byebug
      if user.save
        render json: {}, status: 200
      else
        render json: ErrorSerializer.serialize(user.errors), status: 422
      end
    end

    private
  
      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :authorization)
      end
  
  
  end