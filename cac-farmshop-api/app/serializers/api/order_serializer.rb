class Api::OrderSerializer < ActiveModel::Serializer
    attributes :id, :customer_user_id, :cart_id, :status, :total, :farmgoods #, :customer

    belongs_to :cart
    belongs_to :customer_user 
    has_many :farmgoods, through: :cart
    has_many :farmers, through: :farmgoods 
end

  
  