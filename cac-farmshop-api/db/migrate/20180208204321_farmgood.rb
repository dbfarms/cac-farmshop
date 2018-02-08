class Farmgood < ActiveRecord::Migration[5.1]
  def change
    create_table :farmgoods do |t|
      t.string :name

      t.timestamps
    end 
  end
end
