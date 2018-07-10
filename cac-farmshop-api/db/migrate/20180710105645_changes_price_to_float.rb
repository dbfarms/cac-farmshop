class ChangesPriceToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :farmgoods, :price, :float
  end
end
