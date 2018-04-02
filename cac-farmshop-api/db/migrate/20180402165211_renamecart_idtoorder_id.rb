class RenamecartIdtoorderId < ActiveRecord::Migration[5.1]
  def change
    rename_column :farmer_orders, :cart_id, :order_id
  end
end
