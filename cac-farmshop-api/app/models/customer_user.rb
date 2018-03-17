class CustomerUser < ApplicationRecord
    has_secure_password
    validates :email, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }
    validates :password, presence: true  #, confirmation: true 
    #validates :password_confirmation, presence: true
    
    belongs_to :cart 
    has_many :line_items, through: :cart 

end
