class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.text :description

      t.integer :total_experience, null: false, default: 0
      t.integer :total_fighting, null: false, default: 0
      t.integer :total_strength, null: false, default: 0
      t.integer :total_energy, null: false, default: 0
      t.integer :total_intelligence, null: false, default: 0
      t.integer :total_durability, null: false, default: 0
      t.integer :total_speed, null: false, default: 0
      t.integer :total_camaraderie, null: false, default: 0

      t.timestamps null: false
    end
  end
end
