class Api::CartsController < ApplicationController 
    
    before_action :set_cart, only: [:show, :edit, :destroy]
    
    def index 
        render json: Cart.all 
    end 
    
    def create 
        cart = Cart.new(cart_params)
        if cart.save
            render json: cart 
        else 
            render json: { message: cart.errors}, status: 400
        end 
    end 
    
    def show
        render json: @cart 
    end 
    
    def update 
        if @cart.update(cart_params)
            render json: @cart 
        else 
            render json: { message: @cart.errors }, status: 400 
        end 
    end
    
    def destroy
        if @cart.destroy
            render json: { message: "successfully destroyed" }, status: 204
        else 
            render json: { message: "unable to remove this cart" }, status: 400  
        end 
    end 
    
    private 
    
    def set_cart
        @cart = Cart.find_by(id: params[:id])
    end 
    
    def cart_params
        params.require(:cart).permit(:user_id, :status)
    end 
    
end 