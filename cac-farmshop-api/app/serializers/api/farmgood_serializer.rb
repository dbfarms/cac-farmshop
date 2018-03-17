class Api::FarmgoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :inventory, :category, :farmer, :line_items

  has_many :farmerfarmgoods
  belongs_to :farmer #s, through: :farmerfarmgoods
  has_many :days_available
  has_many :days, through: :days_available

  

end

