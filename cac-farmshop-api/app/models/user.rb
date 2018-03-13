class User < ApplicationRecord
  has_secure_password
  validates :email, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }
  validates :password, presence: true  #, confirmation: true 
  #validates :password_confirmation, presence: true

  belongs_to :farmer 
  belongs_to :customer

end

=begin
Farmgood.all.each do |fg|
  Farmer.all.each do |f|
    if fg.farmer.name == f.name
      f.farmgoods << fg if !farmgoods.include?(fg)
    end
  end 
end  
=end 