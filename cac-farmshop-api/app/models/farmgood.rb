class Farmgood < ApplicationRecord
    validates :name, presence: true 
    
    has_many :farmgood_categories
    
    has_many :farmerfarmgoods
    belongs_to :category
    belongs_to :farmer #s, through: :farmerfarmgoods
    has_many :days_available
    has_many :days, through: :days_available
end
