class Api::FarmerLineItemsController < ApplicationController

    before_action :set_farmer_line_item, only: [:show, :edit, :destroy]

    def index
        #byebug 
        render json: FarmerLineItem.all
    end

    def create

    end

    def show
        render json: @farmer_line_item
    end

    def update
        #byebug 
        if @farmer_line_item.update(farmer_line_item_params)
            render json: @farmer_line_item
        else
            render json: { message: @farmer_line_item.errors }, status: 400
        end
    end

    def destroy

        if @farmer_line_item.quantity == 1 
            if @farmer_line_item.destroy
                render json: { message: "successfully destroyed" }, status: 204
            else
                render json: { message: "unable to remove this farmer line_item" }, status: 400
            end
        elsif @farmer_line_item.quantity > 1 
            @farmer_line_item.quantity -= 1 
            @farmer_line_item.save 
            render json: { message: "deleted one of this item" }, status: 204
        else 
            render json: { message: "unable to remove this farmer line_item" }, status: 400
        end 
    end

    private

    def set_farmer_line_item
        @farmer_line_item = FarmerLineItem.find_by(id: params[:id])
    end

    def farmer_line_item_params
        params.require(:farmer_line_item).permit(:farmgood_id)
    end

end
