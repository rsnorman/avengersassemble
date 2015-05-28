class AddUserReferenceToTeam < ActiveRecord::Migration

  class MigrationTeam < ActiveRecord::Base
    self.table_name = 'teams'
  end

  def change
    MigrationTeam.destroy_all

    add_column :teams, :user_id, :integer, null: false
    add_foreign_key :teams, :users
    add_index :teams, :user_id
  end
end
