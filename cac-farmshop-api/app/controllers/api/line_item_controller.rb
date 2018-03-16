class Api::LineItemsController < ApplicationController

    before_action :set_line_item, only: [:show, :edit, :destroy]

    def index
        render json: Line_item.all
    end

    def create
      byebug 
        line_item = Line_item.new(line_item_params)
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
        @line_item = Line_item.find_by(id: params[:id])
    end

    def line_item_params
        params.require(:line_item).permit(:user_id, :status)
    end

end
