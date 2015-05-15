class AddExperienceToCharacter < ActiveRecord::Migration
  def change
    add_column :characters, :experience, :integer
  end
end
