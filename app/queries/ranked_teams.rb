class RankedTeams

  def initialize(teams = Team.all)
    @teams = teams
  end

  def rankings
    Team.find_by_sql(ranking_sql)
  end

  def rank_for_team(team)
    sql = "SELECT * FROM (#{ranking_sql}) ranked_teams " \
      "WHERE id = #{team.id}"
    Team.find_by_sql(sql).first["rank"]
  end

  private

  def ranking_sql
    team_ids = @teams.pluck(:id)
    team_ids << -1 if team_ids.empty?
    <<-EOF
      SELECT *,
      RANK() OVER (ORDER BY score DESC, created_at ASC) AS rank
      FROM teams
      WHERE teams.id IN (#{team_ids.join(',')})
      ORDER BY rank ASC
    EOF
  end

end
