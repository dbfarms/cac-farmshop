class Orderduedate < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :due_date, :date
    add_timestamps :orders, null: true 

  # backfill existing record with created_at and updated_at
  # values making clear that the records are faked
  long_ago = DateTime.new(2018, 4, 10)
  Order.update_all(created_at: long_ago, updated_at: long_ago)

  # change not null constraints
  change_column_null :orders, :created_at, false
  change_column_null :orders, :updated_at, false
  end
end
