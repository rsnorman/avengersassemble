class UserTeamCreator
  ALLOWED_CUMULATIVE_EXPERIENCE = 2500

  def initialize(user)
    @user = user
    @team = Team.new(user: @user)
  end

  def assemble(team_attributes)
    @team.characters = Character.where(id: team_attributes[:character_ids])

    @team.characters.each do |character|
      Ratings::RATING_NAMES.each { |r| set_rating_value(character, r) }
      @team.total_experience += character.experience
    end

    @team.total_camaraderie = total_camaraderie
    @team.name = "#{@user.name}'s Avengers!"
    @team.score = ScoreCalculator.new(@team).score

    @team.save
    @team
  end

  def set_rating_value(character, rating_name)
    current_rating_value = @team.public_send("total_#{rating_name}")
    new_rating_value =
      current_rating_value + character.ratings.public_send(rating_name)

    @team.public_send("total_#{rating_name}=", new_rating_value)
  end

  def total_camaraderie
    total = 0
    character_pairs.each do |pair|
      total += SharedComicCamaraderie.new(pair.first, pair.last).total
    end
    total
  end

  private

  def character_pairs
    @character_pairs ||= CharacterPairs.new(@team.characters).pairs
  end
end
