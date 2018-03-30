class Farmer < ApplicationRecord
    validates :name, presence: true 
    validates :name, uniqueness: true 
    
    has_many :farmerfarmgoods
    has_many :farmgoods, through: :farmerfarmgoods 
    has_many :farmer_orders
    belongs_to :user 

    
    
end
