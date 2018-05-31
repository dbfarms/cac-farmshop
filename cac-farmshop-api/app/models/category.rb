class Category < ApplicationRecord
    has_many :sub_category_categories
    has_many :sub_categories, through: :sub_category_categories
    
    has_many :farmgoods
end
