class AddFarmerIdToFarmgoodTable < ActiveRecord::Migration[5.1]
  def change
    add_column :farmgoods, :farmer_id, :integer
  end
end
