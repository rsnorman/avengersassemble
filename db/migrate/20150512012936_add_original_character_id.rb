class AddOriginalCharacterId < ActiveRecord::Migration
  def change
    add_column :characters, :original_character_id, :integer, null: true
    add_index :characters, :original_character_id
    add_column :characters, :is_original, :boolean, default: false, null: false
  end
end
