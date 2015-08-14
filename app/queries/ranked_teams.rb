class RankedTeams

  def initialize(teams = Team.all)
    @teams = teams
  end

  def rankings
    @teams
    .select(ranking_select_sql)
    .order('rank ASC')
  end

  def rank_for_team(team)
    Team.find_by_sql(individual_ranking_sql(team)).first['rank']
  end

  private

  def individual_ranking_sql(team)
    team_ids = @teams.pluck(:id)
    team_ids << -1 if team_ids.empty?
    <<-SQL
      SELECT * FROM (
        SELECT #{ranking_select_sql}
        FROM teams
        WHERE teams.id IN (#{team_ids.join(',')})
        ORDER BY rank ASC
      ) ranking_teams
      WHERE id = #{team.id}
    SQL
  end

  def ranking_select_sql
    <<-SQL
      "teams".*,
      RANK() OVER (
        ORDER BY "teams"."score" DESC, "teams"."created_at" ASC
      ) AS "rank"
    SQL
  end

end
