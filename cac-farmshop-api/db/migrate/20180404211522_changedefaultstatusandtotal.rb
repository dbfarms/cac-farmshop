class Changedefaultstatusandtotal < ActiveRecord::Migration[5.1]
  def change
    change_column_default :farmer_orders, :status, "open"
    change_column_default :farmer_orders, :total, 0
  end
end
