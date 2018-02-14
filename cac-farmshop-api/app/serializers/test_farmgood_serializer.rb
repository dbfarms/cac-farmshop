class FarmgoodSerializer < ActiveModel::Serializer
    attributes :id, :name, :price, :inventory

    has_many :farmerfarmgoods
    belongs_to :farmer #s, through: :farmerfarmgoods
    has_many :days_available
    has_many :days, through: :days_available
end


  
  def days
    
    days_array = []
    object.days.each do |day|
      day_to_add = day.attributes
      days_array.push(day_to_add)
    end
    #binding.pry
    return days_array
  end
  
end

