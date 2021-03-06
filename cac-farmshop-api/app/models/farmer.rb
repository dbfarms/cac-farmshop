class Farmer < ApplicationRecord
    validates :name, presence: true 
    validates :name, uniqueness: true 
    
    has_many :farmerfarmgoods
    has_many :farmgoods, through: :farmerfarmgoods 
    has_many :line_items, through: :farmgoods
    #has_many :farmer_orders
    #has_many :orders, through: :line_items
    belongs_to :user 

    
    
end
