class Api::OrdersController < ApplicationController

    before_action :set_order, only: [:show, :edit, :destroy]

    def index
        render json: Order.all
    end

    def create
      #byebug 
        new_order = Order.new(order_params)
        byebug 
        new_order.customer_user = CustomerUser.find(params["customer_user_id"])
        #byebug 
        out_of_stock = []
        refund = []
        total = 0
        @cart = Cart.find(params["cart_id"])
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
        
        #@cart.line_items.each {|li| li.delete }
        user = CustomerUser.find(@cart.customer_user_id)
        new_cart = Cart.new 
        #byebug 
        new_cart.customer_user = user 
        @cart.status = "submitted" 
        user.carts << new_cart 
        user.save 
        new_cart.save 

        total_refund = 0
        refund.each {|r| total_refund += r[1]}
        total -= total_refund
        new_order.total = total 

        #byebug
        #new_order = Order.new(order_params)
        if new_order.save
            new_order.status = "complete"
            new_order.save 
            render json: {new_order: new_order, errors: out_of_stock, refund: refund }
        else
            render json: { message: new_order.errors}, status: 400
        end
    end

    def show
        render json: @order
    end

    def update
        #byebug 
        if @order.update(order_params)
            render json: @order
        else
            render json: { message: @order.errors }, status: 400
        end
    end

    def destroy

        if @cart.destroy
            #byebug 
            render json: { message: "successfully destroyed"}, status: 204
        else
            render json: { message: "unable to remove this cart" }, status: 400
        end
    end

    private

    def set_order
        @order = Order.find_by(id: params[:id])
    end

    def order_params
        params.require(:order).permit(:customer_user_id, :cart_id, :total)
    end

end
