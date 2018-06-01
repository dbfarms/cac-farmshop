class AddsSubCategoryToFarmgood < ActiveRecord::Migration[5.1]
  def change
    add_column :farmgoods, :sub_category_id, :integer
  end
end
