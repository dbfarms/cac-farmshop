class AddLinkToFarmer < ActiveRecord::Migration[5.1]
  def change
    add_column :farmers, :link, :string
  end
end
