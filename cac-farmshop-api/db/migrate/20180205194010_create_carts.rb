class CreateCarts < ActiveRecord::Migration[5.1]
  def change
    create_table :carts do |t|
      t.integer :user_id
      t.string :status, default: 'not submited'

      t.timestamps
    end
  end
end
