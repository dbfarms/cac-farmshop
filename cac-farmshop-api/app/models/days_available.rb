class DaysAvailable < ActiveRecord::Base
    belongs_to :day
    belongs_to :farmgood
  
  end