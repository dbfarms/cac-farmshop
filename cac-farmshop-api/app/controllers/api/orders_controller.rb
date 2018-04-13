class Api::OrdersController < ApplicationController

    before_action :set_order, only: [:show, :edit, :destroy]

    def index
        render json: Order.all
    end

    def create
        new_order = Order.new(order_params)
        
        @cart = Cart.find(params["cart_id"])

        new_order.customer_user = CustomerUser.find(params["customerUserID"])
        #byebug 
        out_of_stock = []
        refund = []
        total = 0
       
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

                if fg.save 
                    new_farmer_order = true
                    fli = FarmerLineItem.new 
                    fli.farmgood = li.farmgood 
                    fli.quantity = li.quantity 

                    new_order.farmer_orders.each do |fo|
                        #byebug 
                        if fo.farmer && fo.farmer == li.farmer 
                            #byebug 
                            new_farmer_order = false 
                            fli.farmer_order = fo 
                            fli.save 
                            fo.farmer_line_items << fli 
                            fo.save 
                        end 
                    end 

                    if new_farmer_order == true 
                        #byebug 
                        new_fo = FarmerOrder.new 
                        new_fo.order = new_order 
                        new_fo.customer_user = new_order.customer_user
                        new_fo.farmer = fli.farmer 
                        new_fo.save 
                        fli.save 
                        new_fo.farmer_line_items << fli 
                        new_order.farmer_orders << new_fo 
                        new_order.save 
                    end 

                end 

                if fg.inventory === 0 
                    ## this will alert the farmer that a stock is out
                end 
            elsif fg.inventory == 0
                out_of_stock.push(`#{fg.name} is out of stock`)
            else 
                over_order = fg.inventory - li.quantity
                amount_available = li.quantity + over_order
                fg.inventory -= amount_available
                total = total + (amount_available * fg.price)
                fg.save 

                if fg.save 
                    new_farmer_order = true
                    fli = FarmerLineItem.new 
                    fli.farmgood = li.farmgood 
                    fli.quantity = li.quantity 

                    order.farmer_orders.each do |fo|
                        if fo.farmer && fo.farmer == li.farmer 
                            #byebug 
                            new_farmer_order = false 
                            fli.farmer_order = fo 
                            fli.save 
                            fo.farmer_line_items << fli 
                            fo.save 
                        end 
                    end 

                    if new_farmer_order == true 
                        new_fo = FarmerOrder.new 
                        new_fo.order = new_order 
                        new_fo.customer_user = new_order.customer_user
                        new_fo.farmer = fli.farmer 
                        new_order.farmer_orders << new_fo
                        new_fo.save 
                        fli.save 
                        new_fo.farmer_line_items << fli 
                        new_order.save
                    end 
                    
                end 

                refund << [fg.name, fg.price]
            end 

        end 

        #byebug 
        new_order.farmer_orders.each do |fo|
            #byebug 
            fo.farmer_line_items.each do |fli|
                #byebug
                fo.total += (fli.quantity * fli.farmgood.price) 
                fo.due_date = fo.created_at + 2.days
                fo.save 
            end 
        end 
        
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
        new_order.due_date = new_order.created_at + 2.day 
        new_order.save 

        #byebug #test save

            ##status here (open until date?)


        if new_order.save
            new_order.status = "complete"
            #new_order
            new_order.save 
            new_order.farmer_orders.each do |fo|
                UserMailer.order_email(fo.farmer.user, fo).deliver_now 
            end 

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

        if @order.destroy
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

    def farmer_order_params
        params.require(:order).permit(:customer_user_id)
    end

end
