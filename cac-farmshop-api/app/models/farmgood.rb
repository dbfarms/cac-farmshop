class Farmgood < ApplicationRecord
    validates :name, presence: true 
    
    has_many :farmerfarmgoods
    belongs_to :farmer #s, through: :farmerfarmgoods
end
