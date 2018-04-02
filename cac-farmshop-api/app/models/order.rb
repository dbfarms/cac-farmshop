class Order < ActiveRecord::Base
    belongs_to :cart
    belongs_to :customer_user 
    has_many :farmgoods, through: :cart
    has_many :farmers, through: :farmgoods 
    has_many :line_items, through: :cart 
    has_many :farmer_line_items, through: :farmgoods
    #has_many :flis, through: :line_items, :source => :farmer
  
end