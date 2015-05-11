class AddValidCharacterFlags < ActiveRecord::Migration
  def change
    add_column :characters, :is_missing_image, :boolean, default: false, null: false
    add_column :characters, :is_missing_ratings, :boolean, default: false, null: false
    add_column :characters, :is_invalid, :boolean, default: false, null: false
  end
end
