class Farmgood < ApplicationRecord
    validates :name, presence: true 
    validates :name, uniqueness: true 
    
    has_many :farmgood_categories
    
    has_many :farmerfarmgoods
    belongs_to :category
    belongs_to :farmer #s, through: :farmerfarmgoods
    has_many :days_available
    has_many :days, through: :days_available
    has_many :line_items
    has_many :farmer_orders
end
