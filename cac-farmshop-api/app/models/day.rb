class Day < ActiveRecord::Base
    has_many :days_available
    has_many :farmgoods, through: :days_available
  end