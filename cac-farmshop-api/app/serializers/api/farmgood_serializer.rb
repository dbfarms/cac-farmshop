class Api::FarmgoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :inventory, :category, :farmer, :line_items, :img_url, :details, :sub_category

  has_many :farmerfarmgoods
  belongs_to :farmer #s, through: :farmerfarmgoods
  has_many :days_available
  has_many :days, through: :days_available

  

end

