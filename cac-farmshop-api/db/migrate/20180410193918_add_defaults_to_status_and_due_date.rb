class AddDefaultsToStatusAndDueDate < ActiveRecord::Migration[5.1]
  def change
    change_column_default :orders, :status, "open"
  end
end
