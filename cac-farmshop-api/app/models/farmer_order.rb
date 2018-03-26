class FarmerOrder < ActiveRecord::Base
    belongs_to :cart
    belongs_to :customer_user 
    belongs_to :farmer 

    has_many :farmgoods, through: :cart
    has_many :line_items, through: :cart 
  
end