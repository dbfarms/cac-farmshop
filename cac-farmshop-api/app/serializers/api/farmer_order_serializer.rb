class Api::FarmerOrderSerializer < ActiveModel::Serializer
    attributes :id, :customer_user_id, :status, :farmer_line_items, :farmgoods, :total, :due_date

    belongs_to :order
    belongs_to :customer_user 
    belongs_to :farmer 

    has_many :farmer_line_items #, include: 'farmer_line_items', fields: { farmgood: [:name] } #, through: :order #, :source => :farmer 
    has_many :farmgoods, through: :farmer_line_items

    def farmer_line_items
        object.farmer_line_items.map do |fli|
            #byebug
            Api::FarmerLineItemSerializer.new(fli).attributes
        end 
    end 
    
end

  
  