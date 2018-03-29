class Api::CustomerUsersController < ApplicationController
    include ErrorSerializer
    #before_action :authenticate, only: [:index] PROBABLY NEED TO MAKE USERS INFORMATION SECRET...
    #skip_before_action :authenticate #, only: [:create]
    #LIB/AUTH.RB NEEDS TO BE REPAIRED NEXT TIME GIT GETS FUCKED UP
  
    def index
      #byebug
      #CHECK AUTHORIZATION HERE NOT JUST JUST AUTHENTICATION
      render json: CustomerUser.all
    end

    def authorized 
      customer_user = Auth.decode(params["_json"])
      render json: customer_user 
      #byebug 
    end 
  
    def show
      render json: CustomerUser.find(params[:id])
    end
  
    def create
      #byebug
      new_customer_user = CustomerUser.new(user_params)
      cart = Cart.new 
      new_customer_user.cart = cart 
      cart.customer_user = new_customer_user
      #byebug

      if new_customer_user.save
        
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