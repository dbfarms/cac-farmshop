class ChangeOrderTableColumnNames < ActiveRecord::Migration[5.1]
  def change
    rename_column :orders, :user_id, :customer_user_id
  end
end
