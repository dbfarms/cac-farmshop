class Order < ActiveRecord::Base
    belongs_to :cart
    belongs_to :customer_user 
    has_many :farmgoods, through: :cart
    has_many :farmers, through: :farmgoods 
  
end