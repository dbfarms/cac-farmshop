class Api::CartSerializer < ActiveModel::Serializer
    attributes :id, :customer_user_id, :status, :farmgoods
  
    has_many :line_items
    has_many :farmgoods, through: :line_items

    belongs_to :customer_user 

  
    
  
  end
  
  