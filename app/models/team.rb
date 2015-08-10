# Models a team and its stats
#
# Database
#   t.string   "name",                           null: false
#   t.text     "description"
#   t.integer  "total_experience",   default: 0, null: false
#   t.integer  "total_fighting",     default: 0, null: false
#   t.integer  "total_strength",     default: 0, null: false
#   t.integer  "total_energy",       default: 0, null: false
#   t.integer  "total_intelligence", default: 0, null: false
#   t.integer  "total_durability",   default: 0, null: false
#   t.integer  "total_speed",        default: 0, null: false
#   t.integer  "total_camaraderie",  default: 0, null: false
#   t.datetime "created_at",                     null: false
#   t.datetime "updated_at",                     null: false
#   t.integer  "user_id",                        null: false
#   t.integer  "score",              default: 0, null: false
#
class Team < ActiveRecord::Base

  belongs_to :user
  has_and_belongs_to_many :characters, join_table: :teams_characters

  def stats
    @stats ||= Stats.from_team(self)
  end

  def rank
    @rank ||= RankedTeams.new.rank_for_team(self)
  end

end
