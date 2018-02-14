class CreateDaysAvailable < ActiveRecord::Migration[5.1]
  def change
    create_table :days_availables do |t|
      t.integer :day_id
      t.integer :farmgood_id
    end
  end
end

