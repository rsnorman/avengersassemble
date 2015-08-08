require_relative 'stat_section'

class TeamStatsSection < SitePrism::Section

  section :experience_stat,   StatSection, '#experience_stat'
  section :camaraderie_stat,  StatSection, '#camaraderie_stat'
  section :strength_stat,     StatSection, '#strength_stat'
  section :fighting_stat,     StatSection, '#fighting_stat'
  section :intelligence_stat, StatSection, '#intelligence_stat'
  section :speed_stat,        StatSection, '#speed_stat'
  section :power_stat,        StatSection, '#power_stat'
  section :energy_stat,       StatSection, '#energy_stat'
  section :durability_stat,   StatSection, '#durability_stat'

  def has_stat?(stat_name, stat_value)
    if max_stats[stat_name].zero?
      percent = Team.pluck(:total_camaraderie).max.zero? ? 100 : 0
    else
      percent = (stat_value / max_stats[stat_name].to_f * 100).round
    end
    public_send("#{stat_name}_stat").has_percent?(percent)
  end

  private

  def max_stats
    @max_stats ||= MaxStats.all
  end

end
