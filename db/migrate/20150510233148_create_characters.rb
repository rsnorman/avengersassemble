class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string :name, null: false
      t.string :real_name
      t.text :description
      t.text :powers
      t.string :thumbnail_url
      t.integer :marvel_id, null: false
      t.integer :wiki_id
      t.integer :fighting_rating
      t.integer :strength_rating
      t.integer :energy_rating
      t.integer :intelligence_rating
      t.integer :durability_rating
      t.integer :speed_rating
    end
  end
end
