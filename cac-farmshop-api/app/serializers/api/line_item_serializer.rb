class Api::LineItemSerializer < ActiveModel::Serializer
    attributes :id, :cart_id, :farmgood_id, :quantity, :farmgood, :cart, :customer_user
  
    belongs_to :farmgood
    belongs_to :cart

  
end
  
  