class CreateSubCategory < ActiveRecord::Migration[5.1]
  def change
    create_table :sub_categories do |t|
      t.string :title
    end
  end
end
