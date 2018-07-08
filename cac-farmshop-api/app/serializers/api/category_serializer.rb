class Api::CategorySerializer < ActiveModel::Serializer
    attributes :id, :title, :sub_categories 
  
end
  
  