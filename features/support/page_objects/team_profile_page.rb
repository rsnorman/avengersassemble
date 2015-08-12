require_relative 'team_stats_section'
require_relative 'team_profile_character_section'

class TeamProfilePage < SitePrism::Page
  set_url '/teams{/team_id}'

  element :leader_avatar,    '#leader_avatar'
  element :team_name,        '#team_name'
  element :team_rank,        '#team_rank'
  element :edit_team_button, '#edit_team_button button'

  section  :stats,      TeamStatsSection,            '#team_stats'
  sections :characters, TeamProfileCharacterSection, '.team-profile-character'

  def has_character?(character_name)
    characters.detect { |c| c.name.text == character_name }.present?
  end
end
