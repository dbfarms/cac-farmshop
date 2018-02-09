class AddImgUrl < ActiveRecord::Migration[5.1]
  def change
    add_column :farmgoods, :img_url, :string
  end
end
