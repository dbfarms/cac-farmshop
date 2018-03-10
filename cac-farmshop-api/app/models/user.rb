class User < ApplicationRecord
  has_secure_password
  validates :email, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }
  validates :password, presence: true  #, confirmation: true 
  #validates :password_confirmation, presence: true

  def say_this
    print "just a test"
  end 

end