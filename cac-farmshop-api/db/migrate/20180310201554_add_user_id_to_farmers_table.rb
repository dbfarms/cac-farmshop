class AddUserIdToFarmersTable < ActiveRecord::Migration[5.1]
  def change
    add_column :farmers, :user_id, :integer 
  end
end
