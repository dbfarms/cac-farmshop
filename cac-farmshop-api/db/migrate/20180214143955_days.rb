class Days < ActiveRecord::Migration[5.1]
  def change
    create_table :days do |t|
      t.string :name
    end 
  end
end
