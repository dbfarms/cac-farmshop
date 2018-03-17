class LineItem < ActiveRecord::Base
    belongs_to :farmgood
    belongs_to :cart
    #belongs_to :customer_user 
    has_one :customer_users, through: :cart 
  end
  