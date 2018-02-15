class Api::DaysController < ApplicationController

    before_action :set_day, only: [:show, :edit, :destroy]

    def index
        render json: Day.all
    end

    def create
      #byebug
        day = Day.new(day_params)
        if day.save
            render json: day
        else
            render json: { message: day.errors}, status: 400
        end
    end

    def show
        render json: @day
    end

    def update
        if @day.update(day_params)
            render json: @day
        else
            render json: { message: @day.errors }, status: 400
        end
    end

    def destroy
        if @day.destroy
            render json: { message: "successfully destroyed" }, status: 204
        else
            render json: { message: "unable to remove this day" }, status: 400
        end
    end

    private

    def set_day
        @day = Day.find_by(id: params[:id])
    end

    def day_params
        params.require(:day).permit(:name)
    end

end
