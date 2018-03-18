class Api::LineItemsController < ApplicationController

    before_action :set_line_item, only: [:show, :edit, :destroy]

    def index
        render json: LineItem.all
    end

    def create
      #byebug 
        ##### this is where i left off, finding a cart in order to see if a lineitem already exists for this particular item 
        if Cart.find_by(customer_user_id: params["user_id"])
            byebug 
        end 

        line_item = LineItem.new(line_item_params)
        if line_item.save
            render json: line_item
        else
            render json: { message: line_item.errors}, status: 400
        end
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
        if @line_item.destroy
            render json: { message: "successfully destroyed" }, status: 204
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
