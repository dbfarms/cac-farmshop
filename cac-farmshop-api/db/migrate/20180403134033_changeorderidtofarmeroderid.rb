class Changeorderidtofarmeroderid < ActiveRecord::Migration[5.1]
  def change
    rename_column :farmer_line_items, :order_id, :farmer_order_id
  end
end
