class ChangeCartsStatusDefault < ActiveRecord::Migration[5.1]
  def change
    change_column_default :carts, :status, "not submitted"
  end
end
