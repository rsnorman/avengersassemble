module Helpers
  def find_character(name)
    @characters ||= {}
    @characters[name] ||= Character.find_by(name: name)
  end

  def create_user
    User.create(
      name:  ['Ryan Norman', 'Jessica Garvey', 'Dexter Beagle'].sample,
      image: 'http://graph.facebook.com/10100751232536290/picture?type=large'
    )
  end

  def create_team(name)
    team = Team.new(
      name: name,
      user: create_user
    )

    Ratings::RATING_NAMES.each do |rating|
      team.public_send("total_#{rating}=", (1..7).to_a.sample)
    end

    team.total_experience  = (1500..2500).to_a.sample
    team.total_camaraderie = (50..200).to_a.sample
    team.score             = ScoreCalculator.new(team).score
    team.save
  end

  def notifications
    @notifications ||= NotificationsSection.new('body', '#notifications')
  end
end

World(Helpers)
