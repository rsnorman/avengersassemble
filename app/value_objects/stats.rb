class Stats

  STAT_NAMES = %i(
    fighting strength energy intelligence
    durability speed camaraderie experience
  ).freeze

  attr_reader(*STAT_NAMES)

  def self.from_team(team)
    stats = STAT_NAMES.collect do |stat_name|
      team.public_send("total_#{stat_name}")
    end

    Stats.new(*stats)
  end

  def all
    @all_stats ||= STAT_NAMES.collect { |r| public_send(r) }
  end

  private

  def initialize(*stats)
    STAT_NAMES.each_with_index do |stat_name, index|
      instance_variable_set(
        "@#{stat_name}", stats[index]
      )
    end
  end

end
