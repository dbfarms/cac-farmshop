class AddCategoryIdToSubCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :sub_categories, :category_id, :integer
  end
end
