class AddScoreColumnToTeam < ActiveRecord::Migration
  def change
    add_column :teams, :score, :integer, null: false, default: 0
  end
end
