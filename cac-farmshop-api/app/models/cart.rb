class Cart < ApplicationRecord
    has_many :line_items
    has_many :farmgoods, through: :line_items
    
    belongs_to :customer_user 

end
