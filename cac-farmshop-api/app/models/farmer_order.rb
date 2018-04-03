class FarmerOrder < ActiveRecord::Base
    belongs_to :order
    belongs_to :customer_user 
    #belongs_to :cart 
    belongs_to :farmer 

    has_many :farmgoods, through: :farmer 
    has_many :line_items, through: :farmgoods 


    has_many :farmer_line_items #, through: :order #, :source => :farmer 
    has_many :farmgoods, through: :farmer_line_items
    
    
end
