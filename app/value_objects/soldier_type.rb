class SoldierType

  TYPES = {
    soldier: 0,
    shield_agent: 1,
    avenger: 2
  }

  TYPES.each_pair do |key, value|
    const_set("#{key.upcase}_TYPE", value)
  end

  def self.from_experience(experience)
    type = if experience.to_i < mode_experience
             SOLDIER_TYPE
           elsif experience < average_experience
             SHIELD_AGENT_TYPE
           else
             AVENGER_TYPE
           end

    new(type)
  end

  def initialize(type)
    @type = type
  end

  def name
    type_key = TYPES.keys[TYPES.values.index(@type)]
    type_key.to_s.split('_').map(&:capitalize).join(' ')
  end

  def self.mode_experience
    @mode_experience ||= begin
      middle_index = (Character.experienced.count / 2).to_i
      Character.experienced
      .order(:experience)
      .limit(1)
      .offset(middle_index)
      .pluck(:experience)
      .first
    end
  end

  def self.average_experience
    @average_experience ||= begin
      middle_index = (Character.count / 2).to_i
      Character.experienced.average(:experience).to_i
    end
  end

end
