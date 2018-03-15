class ChangeUserIdtoCustomerUserId < ActiveRecord::Migration[5.1]
  def change
    rename_column :carts, :user_id, :customer_user_id
  end
end
