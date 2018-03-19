class Api::LineItemsController < ApplicationController

    before_action :set_line_item, only: [:show, :edit, :destroy]

    def index
        render json: LineItem.all
    end

    def create
        newLine = true 
        cart = Cart.find_by(customer_user_id: params["user_id"])
        #byebug 

        cart.line_items.each do |li| 
            if li.farmgood_id === params["farmgood_id"]
                #byebug 
                li.quantity += 1 
                li.save 
                newLine = false 
                render json: li
            end 
        end 

        if newLine == true 
            line_item = LineItem.new(line_item_params)
            line_item.cart = cart 
            cart.line_items << line_item 
            #byebug
            if line_item.save
                #byebug
                render json: line_item
            else
                render json: { message: line_item.errors}, status: 400
            end
        end 

=begin 
        if cart.line_items != []
            #byebug 
            cart.line_items.each do |li| 
                if li.farmgood_id === params["farmgood_id"]
                    #byebug 
                    li.quantity += 1 
                    li.save 

                    render json: li
                end 
            end 
        else 
            line_item = LineItem.new(line_item_params)
            line_item.cart = cart 
            cart.line_items << line_item 
            #byebug
            if line_item.save
                render json: line_item
            else
                render json: { message: line_item.errors}, status: 400
            end
        end 
=end 

    end

    def show
        render json: @line_item
    end

    def update
        byebug 
        if @line_item.update(line_item_params)
            render json: @line_item
        else
            render json: { message: @line_item.errors }, status: 400
        end
    end

    def destroy

        if @line_item.quantity == 1 
            if @line_item.destroy
                render json: { message: "successfully destroyed" }, status: 204
            else
                render json: { message: "unable to remove this line_item" }, status: 400
            end
        elsif @line_item.quantity > 1 
            @line_item.quantity -= 1 
            @line_item.save 
            render json: { message: "deleted one of this item" }, status: 204
        else 
            render json: { message: "unable to remove this line_item" }, status: 400
        end 
    end

    private

    def set_line_item
        @line_item = LineItem.find_by(id: params[:id])
    end

    def line_item_params
        params.require(:line_item).permit(:cart_id, :farmgood_id)
    end

end
