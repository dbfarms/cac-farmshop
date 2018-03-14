class Api::UsersController < ApplicationController
    include ErrorSerializer
    #before_action :authenticate, only: [:index] PROBABLY NEED TO MAKE USERS INFORMATION SECRET...
    #skip_before_action :authenticate #, only: [:create]
    #LIB/AUTH.RB NEEDS TO BE REPAIRED NEXT TIME GIT GETS FUCKED UP
  
    def index
      #byebug
      #CHECK AUTHORIZATION HERE NOT JUST JUST AUTHENTICATION
      
      render json: User.all #CustomerUser.all  #{users: User.all, customers: Customer_User.all}
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
      #byebug
      new_user = User.new(user_params)

      if params["user"]["authorization"] === 'farmer'
        new_farmer = Farmer.new
        new_farmer.name = params["user"]["typeOfUser"]["name"]
        new_farmer.address = params["user"]["typeOfUser"]["address"]
        #byebug
        new_user.farmer = new_farmer
        new_farmer.user = new_user 
        new_farmer.save 
      elsif params["user"]["authorization"] === 'customer'
        byebug
      elsif params["user"]["authorization"] === 'admin'
        byebug 
      end 
      #byebug
      if new_user.save
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