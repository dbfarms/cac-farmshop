class CreateFarmerLineItem < ActiveRecord::Migration[5.1]
  def change
    create_table :farmer_line_items do |t|
      t.integer :order_id
      t.integer :farmgood_id
      t.integer :quantity, default: 1
    end
  end
end
