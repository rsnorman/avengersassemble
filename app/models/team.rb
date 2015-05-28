class Team < ActiveRecord::Base

  belongs_to :user
  has_and_belongs_to_many :characters, join_table: :teams_characters

end
