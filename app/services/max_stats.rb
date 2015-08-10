class MaxStats

  MAX_STAT_VALUE = 35

  def self.all
    max_stats = {}
    Stats::STAT_NAMES.each do |stat_name|
      max_stats[stat_name] = MAX_STAT_VALUE
    end
    max_stats[:camaraderie] = Team.pluck(:total_camaraderie).max
    max_stats[:experience]  = Team.pluck(:total_experience).max
    max_stats
  end

end
