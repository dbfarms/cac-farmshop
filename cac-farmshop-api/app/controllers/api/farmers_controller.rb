class Api::FarmersController < ApplicationController

    before_action :set_farmer, only: [:show, :edit, :destroy]

    def index
        render json: {farmers: Farmer.all, customers: CustomerUser.all}
    end

    def create
      #byebug
        farmer = Farmer.new(farmer_params)
        if farmer.save
            render json: farmer
        else
            render json: { message: farmer.errors}, status: 400
        end
    end

    def show
        render json: @farmer
    end

    def update
        if @farmer.update(farmer_params)
            render json: @farmer
        else
            render json: { message: @farmer.errors }, status: 400
        end
    end

    def destroy
        if @farmer.destroy
            render json: { message: "successfully destroyed" }, status: 204
        else
            render json: { message: "unable to remove this farmer" }, status: 400
        end
    end

    private

    def set_farmer
        @farmer = Farmer.find_by(id: params[:id])
    end

    def farmer_params
        params.require(:farmer).permit(:name, :address, :kind_of)
    end

end
