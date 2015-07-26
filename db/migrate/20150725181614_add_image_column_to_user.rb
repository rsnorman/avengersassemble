class AddImageColumnToUser < ActiveRecord::Migration
  def change
    add_column :users, :image, :string, limit: 1024
  end
end
