class Api::FarmgoodsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :update, :destroy]
    before_action :set_farmgood, only: [:edit, :destroy]

    def index
        render json: Farmgood.all
    end

    def create
        #byebug
        farmerID = params["farmGood"]["farmer"].to_i
        category_name = params["farmGood"]["Category"]

        farmgood = Farmgood.new(farmgood_params)
        
        params["farmGood"]["daysAvailable"].each do |day|
            farmgood.days << Day.find_by(name: day[0])
        end 
        
        farmgood.category = Category.find_by(title: category_name)
        farmgood.farmer = Farmer.find(farmerID)
        byebug 
        if farmgood.save
            render json: farmgood
        else
            render json: { message: farmgood.errors}, status: 400
        end
    end

    def show
        @farmgood = Farmgood.find(params["id"])
        render json: @farmgood #, each_serializer: FarmgoodSerializer
    end

    def update
        #byebug
        set_farmgood 
        category_name = params["farmGood"]["category"]
        @farmgood.days = []
        #byebug
        params["farmGood"]["days_array"].each do |day|
            @farmgood.days << Day.find_by(name: day)
        end 
        @farmgood.category = Category.find_by(title: category_name)
        #byebug
        @farmgood.update(farmgood_params)
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
        #byebug
        if params["action"] === "destroy"
            @farmgood=Farmgood.find(params["id"])
        else 
            @farmgood = Farmgood.find(params["farmGood"]["id"])
        end 
    end

    def farmgood_params
        params.require(:farmGood).permit(:name, :inventory, :price)
    end

end

=begin

class Api::FarmgoodsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_farmgood, only: [:show, :edit, :destroy]

    def index
        render json: Farmgood.all
    end

    def create
        #byebug
        farmerID = params["farmGood"]["farmer"].to_i
        category_name = params["farmGood"]["Category"]

        farmgood = Farmgood.new(farmgood_params)
        
        params["farmGood"]["daysAvailable"].each do |day|
            farmgood.days << Day.find_by(name: day)
        end 
        
        farmgood.category = Category.find_by(title: category_name)
        farmgood.farmer = Farmer.find(farmerID)
        #byebug 
        if farmgood.save
            render json: farmgood
        else
            render json: { message: farmgood.errors}, status: 400
        end
    end

    def show
        render json: @farmgood #, each_serializer: FarmgoodSerializer
    end

    def update
        #byebug
        set_farmgood 
        farmerID = params["farmGood"]["farmer"].to_i
        category_name = params["farmGood"]["Category"]
        @farmgood.days = []
        #byebug
        params["farmGood"]["daysAvailable"].each do |day|
            @farmgood.days << Day.find_by(name: day)
        end 
        #byebug
        @farmgood.category = Category.find_by(title: category_name)
        @farmgood.farmer = Farmer.find(farmerID)
        #byebug
        @farmgood.update(farmgood_params)
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
        @farmgood = Farmgood.find(params["farmGood"]["id"])
    end

    def farmgood_params
        params.require(:farmGood).permit(:name, :inventory, :price)
    end

end


=end 