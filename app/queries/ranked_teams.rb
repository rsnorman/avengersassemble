class RankedTeams

  CAMARADERIE_WEIGHT  = 2
  EXP_WEIGHT          = 1.2
  STRENGTH_WEIGHT     = 1.5
  SPEED_WEIGHT        = 1.5
  INTELLIGENCE_WEIGHT = 1.5
  FIGHTING_WEIGHT     = 1
  ENERGY_WEIGHT       = 1
  DURABILITY_WEIGHT   = 1

  def initialize(teams = Team.all)
    @teams = teams
  end

  def rankings
    Team.find_by_sql(ranking_sql)
  end

  private

  # rubocop:disable Metrics/MethodLength
  def ranking_sql
    <<-EOF
      SELECT *,
      (
         log((total_camaraderie * 10) | 1)   * #{CAMARADERIE_WEIGHT}  +
         log(total_experience | 1)           * #{EXP_WEIGHT}          +
         total_strength                      * #{STRENGTH_WEIGHT}     +
         total_speed                         * #{SPEED_WEIGHT}        +
         total_intelligence                  * #{INTELLIGENCE_WEIGHT} +
         total_energy                        * #{ENERGY_WEIGHT}       +
         total_fighting                      * #{FIGHTING_WEIGHT}     +
         total_durability                    * #{DURABILITY_WEIGHT}
      ) as score
      FROM teams
      WHERE teams.id IN (#{@teams.pluck(:id).join(',')})
      ORDER BY score DESC
    EOF
  end
  # rubocop:enable Metrics/MethodLength

end
