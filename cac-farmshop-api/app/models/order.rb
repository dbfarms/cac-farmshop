class Order < ActiveRecord::Base
    belongs_to :cart
    has_many :farmgoods, through: :cart
    belongs_to :customer_user 
  
end