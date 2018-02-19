class Api::FarmgoodsController < ApplicationController
    #before_action :authenticate_user!
    before_action :set_farmgood, only: [:show, :edit, :destroy]

    def index
        render json: Farmgood.all
    end

    def create
        #byebug
        farmerID = params["farmGood"]["farmer"].to_i
        category_name = params["farmGood"]["Category"]

        farmgood = Farmgood.new(farmgood_params)
        #byebug
        farmgood.category = Category.find_by(title: category_name)
        farmgood.farmer = Farmer.find(farmerID)
        
        if farmgood.save
            render json: farmgood
        else
            render json: { message: farmgood.errors}, status: 400
        end
    end

    def show
        render json: @farmgood, each_serializer: FarmgoodSerializer
    end

    def update
        if @farmgood.update(farmgood_params)
            render json: @farmgood
        else
            render json: { message: @farmgood.errors }, status: 400
        end
    end

    def destroy
        if @farmgood.destroy
            render json: { message: "successfully destroyed" }, status: 204
        else
            render json: { message: "unable to remove this farmgood" }, status: 400
        end
    end

    private

    def set_farmgood
        @farmgood = Farmgood.find_by(id: params[:id])
    end

    def farmgood_params
        params.require(:farmGood).permit(:name, :inventory, :price)
    end

end
