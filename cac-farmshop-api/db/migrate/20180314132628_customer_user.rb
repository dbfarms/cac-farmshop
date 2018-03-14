class CustomerUser < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_users do |t|
      t.string :first_name 
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.integer :customer_user_id
      t.timestamps  
    end 
  end
end
