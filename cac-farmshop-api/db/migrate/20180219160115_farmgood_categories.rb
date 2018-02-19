class FarmgoodCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :farmgood_categories do |t|
      t.integer :category_id
      t.integer :farmgood_id

      t.timestamps
    end
  end
end
