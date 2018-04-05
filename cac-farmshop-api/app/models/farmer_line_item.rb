class FarmerLineItem < ActiveRecord::Base
    belongs_to :farmgood
    #belongs_to :order
    belongs_to :farmer_order 
    #belongs_to :customer_user 
    
    has_one :customer_user, through: :farmer_order
    has_one :farmer, through: :farmgood

    #has_one :line_item, through: :cart 

    
    #has_one :farmgood, through: :farmer 
    
  end
  