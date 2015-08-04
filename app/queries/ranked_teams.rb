class RankedTeams

  def initialize(teams = Team.all)
    @teams = teams
  end

  def rankings
    Team.find_by_sql(ranking_sql)
  end

  private

  def ranking_sql
    <<-EOF
      SELECT *,
      RANK() OVER (ORDER BY score DESC, created_at ASC) AS rank
      FROM teams
      WHERE teams.id IN (#{@teams.pluck(:id).join(',')})
      ORDER BY rank ASC
    EOF
  end

end
