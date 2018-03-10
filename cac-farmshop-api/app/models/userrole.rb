class UserRole < ApplicationRecord
    belongs_to :user
    belongs_to :farmer
    #belongs_to :customer
    #belongs_to :customer  #customer doesn't exist yet

end
