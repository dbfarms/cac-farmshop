class ChangeItemIdtoFarmgoodId < ActiveRecord::Migration[5.1]
  def change
    rename_column :line_items, :item_id, :farmgood_id 
  end
end
