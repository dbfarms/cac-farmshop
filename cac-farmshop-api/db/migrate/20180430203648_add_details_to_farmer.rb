class AddDetailsToFarmer < ActiveRecord::Migration[5.1]
  def change
    add_column :farmers, :details, :text
  end
end
