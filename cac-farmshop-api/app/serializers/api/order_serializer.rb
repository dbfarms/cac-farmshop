class Api::OrderSerializer < ActiveModel::Serializer
    attributes :id, :customer_user_id, :cart_id, :status, :total, :farmgoods, :cart, :line_items #, :customer

    belongs_to :cart
    belongs_to :customer_user 
    has_many :farmgoods, through: :cart
    has_many :farmers, through: :farmgoods 
    has_many :line_items, through: :cart
end

  
  