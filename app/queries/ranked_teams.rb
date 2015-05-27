class RankedTeams

  def initialize(teams = Team.all)
    @teams = teams
  end

  def rankings
    @teams.order(total_camaraderie: :desc)
  end

end
