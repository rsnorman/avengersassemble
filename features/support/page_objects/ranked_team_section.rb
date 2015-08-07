class RankedTeamSection < SitePrism::Section
  element :name, '.team-name'

  def has_team_name?(team_name)
    name.has_content? team_name
  end
end
