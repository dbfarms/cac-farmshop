class Api::CategoriesController < ApplicationController

    before_action :set_cat, only: [:show, :edit, :destroy]

    def index
        render json: Category.all
    end

    def create
      #byebug 
        cat = Category.new(cat_params)
        if cat.save
            render json: cat
        else
            render json: { message: cat.errors}, status: 400
        end
    end

    def show
        render json: @cat
    end

    def update
        #byebug 
        if @cat.update(cat_params)
            render json: @cat
        else
            render json: { message: @cat.errors }, status: 400
        end
    end

    def destroy
        #byebug 
=begin 
        out_of_stock = []
        refund = []
        total = 0
        #byebug
        @cat.line_items.each do |li| 
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
            elsif fg.inventory == 0
                out_of_stock.push(`#{fg.name} is out of stock`)
            else 
                over_order = fg.inventory - li.quantity
                amount_available = li.quantity + over_order
                fg.inventory -= amount_available
                total = total + (amount_available * fg.price)
                fg.save 

                refund << [fg.name, fg.price]
            end 

        end 
        
        @cat.line_items.each {|li| li.delete }
        user = CustomerUser.find(@cat.customer_user_id)
        new_cat = Category.new 
        #byebug 
        new_cat.customer_user = user 
        user.cat = new_cat 
        user.save 
        new_cat.save 

        total_refund = 0
        refund.each {|r| total_refund += r[1]}
        total -= total_refund

        #byebug
=end 
        if @cat.destroy
            #byebug 
            render json: { message: "successfully destroyed", errors: out_of_stock, refund: refund, total: total} #, status: 204
        else
            render json: { message: "unable to remove this cat" }, status: 400
        end
    end

    private

    def set_cat
        @cat = Category.find_by(id: params[:id])
    end

    def cat_params
        params.require(:cat).permit(:title)
    end

end
