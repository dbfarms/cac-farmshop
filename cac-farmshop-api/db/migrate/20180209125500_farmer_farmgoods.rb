class FarmerFarmgoods < ActiveRecord::Migration[5.1]
  def change
    create_table :farmerfarmgoods do |t|
      t.integer :farmer_id
      t.integer :farmgood_id

      t.timestamps
    end 
  end
end
