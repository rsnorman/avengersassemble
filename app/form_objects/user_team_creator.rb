class UserTeamCreator
  ALLOWED_CUMULATIVE_EXPERIENCE = 2500

  def initialize(user, camaraderie_calculator = SharedComicCamaraderie)
    @user = user
    @camaraderie_calculator = camaraderie_calculator
    @team = Team.new(user: @user)
  end

  def assemble(team_attributes = { character_ids: [691, 1307, 649, 309, 355] })
    @team.characters = Character.where(id: team_attributes[:character_ids])

    @team.characters.each do |character|
      Ratings::RATING_NAMES.each { |r| set_rating_value(character, r) }
      @team.total_experience += character.experience
    end

    @team.total_camaraderie = @camaraderie_calculator.new(@team).calculate
    @team.name = "#{@user.name}'s Avengers!"

    @team.save
    @team
  end

  def set_rating_value(character, rating_name)
    current_rating_value = @team.public_send("total_#{rating_name}")
    new_rating_value =
      current_rating_value + character.ratings.public_send(rating_name)

    @team.public_send("total_#{rating_name}=", new_rating_value)
  end
end
