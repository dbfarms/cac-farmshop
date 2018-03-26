class FarmerOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :farmer_orders do |t|
      t.integer :customer_user_id
      t.integer :cart_id
      t.integer :farmer_id 
      t.string :status
      t.integer :total

      t.timestamps
    end 
  end
end
