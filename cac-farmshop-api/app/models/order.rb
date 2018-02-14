class Order < ActiveRecord::Base
    belongs_to :cart
    has_many :farmgoods, through: :cart
  
end