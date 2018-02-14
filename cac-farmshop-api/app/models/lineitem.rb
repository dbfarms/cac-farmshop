class LineItem < ActiveRecord::Base
    belongs_to :farmgood
    belongs_to :cart
  end
  