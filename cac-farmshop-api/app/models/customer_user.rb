class Customer_User < ApplicationRecord
    validates :name, presence: true 
    validates :name, uniqueness: true 
    
    #belongs_to :user 
    
end
