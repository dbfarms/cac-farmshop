class Api::FarmerLineItemSerializer < ActiveModel::Serializer
    attributes :id, :farmgood_id, :quantity, :farmgood, :customer_user, :farmer, :farmer_order
  
    belongs_to :farmgood
    belongs_to :farmer_order 
    
    has_one :customer_user, through: :farmer_order
    has_one :farmer, through: :farmgood


  
end
  
  