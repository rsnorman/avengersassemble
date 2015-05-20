class CreateTeamCharacters < ActiveRecord::Migration
  def change
    create_table :teams_characters do |t|
      t.references :character
      t.references :team

      t.timestamps null: false
    end

    add_index :teams_characters, :character_id
    add_index :teams_characters, :team_id
  end
end
