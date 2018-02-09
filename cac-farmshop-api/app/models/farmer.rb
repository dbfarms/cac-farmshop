class Farmer < ApplicationRecord
    has_many :farmerfarmgoods
    has_many :farmgoods, through: :farmerfarmgoods 
    
end
