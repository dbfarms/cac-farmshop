class AddFarmerIdToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :farmer_id, :integer 
  end
end
