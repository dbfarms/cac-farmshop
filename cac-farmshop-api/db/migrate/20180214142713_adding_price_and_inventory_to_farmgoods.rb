class AddingPriceAndInventoryToFarmgoods < ActiveRecord::Migration[5.1]
  def change
    add_column :farmgoods, :price, :integer
    add_column :farmgoods, :inventory, :integer
    add_column :farmgoods, :category_id, :integer
  end
end
