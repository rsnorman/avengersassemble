class Team < ActiveRecord::Base
  has_and_belongs_to_many :characters, join_table: :teams_characters
end
