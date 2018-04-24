class AddDetailsToFarmGood < ActiveRecord::Migration[5.1]
  def change
    add_column :farmgoods, :details, :string
  end
end
