class CharacterValidator

  def initialize(characters = Character.all)
    @characters = characters
  end

  def validate_all
    @characters.each do |character|
      character.is_missing_image   = character.thumbnail_image.missing?
      character.is_missing_ratings = character.ratings.missing?
      character.is_invalid         = is_invalid?(character)
      character.save
    end
  end

  private

  def is_invalid?(character)
    false
  end

end
