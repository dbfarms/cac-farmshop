class SubCategory < ApplicationRecord
    has_many :sub_category_categories
    has_one :category, through: :sub_category_categories

end
