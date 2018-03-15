class Changecustomeruseridtocartid < ActiveRecord::Migration[5.1]
  def change
    rename_column :customer_users, :customer_user_id, :cart_id
  end
end
