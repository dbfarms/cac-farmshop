class AddDateDueToFarmerOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :farmer_orders, :due_date, :date 
  end
end
