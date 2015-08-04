class ScoreCalculator

  WEIGHTS = {
    camaraderie: {
      multiplier: 3,
      calculator: -> (v) { Math.log(v.zero? ? 1 : v * 10) }
    },
    experience: {
      multiplier: 1.2,
      calculator: -> (v) { Math.log(v.zero? ? 1 : v) }
    }
  }

  Ratings::RATING_NAMES.each { |r| WEIGHTS[r] = { multiplier: 1 } }

  WEIGHTS.freeze

  def initialize(team)
    @team = team
  end

  def score
    score = 0
    WEIGHTS.each_pair do |key, value|
      total  = @team.public_send("total_#{key}")
      total  = value[:calculator].try(:call, total) || total
      total *= value[:multiplier]
      score += total
    end
    score.round
  end

end
