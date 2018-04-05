class Api::FarmerLineItemSerializer < ActiveModel::Serializer
    attributes :id, :cart_id, :farmgood_id, :quantity, :farmgood, :cart, :customer_users, :farmer
  
    belongs_to :farmgood
    belongs_to :cart

  
end
  
  