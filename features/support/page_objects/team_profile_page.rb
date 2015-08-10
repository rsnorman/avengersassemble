require_relative 'team_stats_section'
require_relative 'team_profile_character_section'

class TeamProfilePage < SitePrism::Page
  set_url '/teams{/team_id}'

  element :leader_avatar, '#leader_avatar'
  element :team_name,     '#team_name'
  element :team_rank,     '#team_rank'

  section  :stats,      TeamStatsSection,            '#team_stats'
  sections :characters, TeamProfileCharacterSection, '.team-profile-character'
end
