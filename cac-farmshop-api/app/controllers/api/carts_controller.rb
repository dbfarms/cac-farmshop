class Api::CartsController < ApplicationController

    before_action :set_cart, only: [:show, :edit, :destroy]

    def index
        render json: Cart.all
    end

    def create
      #byebug 
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
        #byebug 
        if @cart.update(cart_params)
            render json: @cart
        else
            render json: { message: @cart.errors }, status: 400
        end
    end

    def destroy
        #byebug 
=begin 
        out_of_stock = []
        refund = []
        total = 0
        #byebug
        @cart.line_items.each do |li| 
            fg = Farmgood.find(li.farmgood_id)
            #byebug 
            if fg.inventory == nil 
                fg.inventory = 0
                fg.save 
            end 

            if (fg.inventory - li.quantity >= 0)
                fg.inventory -= li.quantity 
                total = total + (li.quantity * fg.price)
                fg.save 
            elsif fg.inventory == 0
                out_of_stock.push(`#{fg.name} is out of stock`)
            else 
                over_order = fg.inventory - li.quantity
                amount_available = li.quantity + over_order
                fg.inventory -= amount_available
                total = total + (amount_available * fg.price)
                fg.save 

                refund << [fg.name, fg.price]
            end 

        end 
        
        @cart.line_items.each {|li| li.delete }
        user = CustomerUser.find(@cart.customer_user_id)
        new_cart = Cart.new 
        #byebug 
        new_cart.customer_user = user 
        user.cart = new_cart 
        user.save 
        new_cart.save 

        total_refund = 0
        refund.each {|r| total_refund += r[1]}
        total -= total_refund

        #byebug
=end 
        if @cart.destroy
            #byebug 
            render json: { message: "successfully destroyed", errors: out_of_stock, refund: refund, total: total} #, status: 204
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
