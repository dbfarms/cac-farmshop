class ChangeTypeToKindOf < ActiveRecord::Migration[5.1]
  def change
    rename_column :farmers, :type, :kind_of
  end
end
