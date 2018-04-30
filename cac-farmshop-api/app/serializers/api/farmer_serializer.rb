class Api::FarmerSerializer < ActiveModel::Serializer
    attributes :id, :name, :line_items, :link, :address, :kind_of, :details
  
    has_many :farmerfarmgoods
    has_many :farmgoods, through: :farmerfarmgoods 
    has_many :line_items, through: :farmgoods
    #has_many :farmer_orders
    belongs_to :user 
  
    
  
  end
  
  