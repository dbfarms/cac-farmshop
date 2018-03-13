class Api::UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :farmer, :customer

    #belongs_to :farmer
end

  
  