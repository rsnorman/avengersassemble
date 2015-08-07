require_relative 'ranked_team_section'

class LeaderboardPage < SitePrism::Page
  set_url '/'
  sections :ranked_teams, RankedTeamSection, '.ranking-team'

  def has_team?(name)
    ranked_teams.detect do |rt|
      rt.has_team_name? name
    end.present?
  end
end
