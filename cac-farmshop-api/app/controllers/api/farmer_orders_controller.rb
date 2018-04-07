### see orders_controller for more 

class Api::FarmerOrdersController < ApplicationController

    before_action :set_order, only: [:show, :edit, :update, :destroy]

    def index
        render json: FarmerOrder.all#, include: 'farmer_line_items', fields: { farmgood: [:name] }
        # 'posts.category, posts.author.address', fields: { posts: { category: [:name], author: [:id, :name] } }

    end

    def create
      #byebug 
=begin 
        new_farmer_order = FarmerOrder.new(order_params)
        byebug 
        new_farmer_order.customer_user = CustomerUser.find(params["customerUserID"])
        #byebug 
        out_of_stock = []
        #refund = []
        total = 0
        @cart = Cart.find(params["cart_id"])
        @cart.line_items.each do |li| 
            fg = Farmgood.find(li.farmgood_id)
            #byebug 
            if fg.inventory == nil 
                fg.inventory = 0
                fg.save 
            end 

            if (fg.inventory === 0)
                #fg.inventory -= li.quantity 
                #total = total + (li.quantity * fg.price)
                #fg.save
                out_of_stock << fg 
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
        @cart.save 
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
=end 
    end

    def show
        render json: @farmer_order
    end

    def update
        #byebug 
        if params["status"] == "change"
            #byebug 
            if @farmer_order.status == "open"
                @farmer_order.status = "closed"
                render json: @farmer_order
            else 
                @farmer_order.status = "open"
                render json: @farmer_order
            end 
        else 
            if @farmer_order.update(params)
                render json: @farmer_order
            else
                render json: { message: @farmer_order.errors }, status: 400
            end
        end 
    end

    def destroy

        if @farmer_order.destroy
            #byebug 
            render json: { message: "successfully destroyed"}, status: 204
        else
            render json: { message: "unable to remove this farmer's order" }, status: 400
        end
    end

    private

    def set_order
        @farmer_order = FarmerOrder.find(params["id"])
    end

    def farmer_order_params
        params.require(:order).permit(:customer_user_id, :cart_id, :total)
    end

end
