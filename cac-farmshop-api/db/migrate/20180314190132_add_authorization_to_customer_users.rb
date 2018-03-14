class AddAuthorizationToCustomerUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :customer_users, :authorization, :string
  end
end
