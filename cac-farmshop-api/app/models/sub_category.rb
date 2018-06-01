class SubCategory < ApplicationRecord
    #has_one :sub_category_categories
    
    #has_many :categories, through: :sub_category_categories
    #has_one :category, through: :sub_category_categories
    #has_many :farmgoods #, through: :categories
    belongs_to :category
    has_many :farmgoods, through: :category

end
