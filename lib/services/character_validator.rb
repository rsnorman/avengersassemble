class CharacterValidator
  MISSING_IMAGE_PATH = "image_not_available.jpg".freeze
  def initialize(characters = Character.all)
    @characters = characters
  end

  def validate_all
    @characters.each do |character|
      character.is_missing_image = missing_image?(character)
      character.is_missing_ratings = missing_ratings?(character)
      character.is_invalid = is_invalid?(character)
      character.save
    end
  end

  private

  def missing_image?(character)
    character.thumbnail_url.include?(MISSING_IMAGE_PATH)
  end

  def missing_ratings?(character)
    character.fighting_rating == 1 &&
    character.strength_rating == 1 &&
    character.energy_rating == 1 &&
    character.intelligence_rating == 1 &&
    character.durability_rating == 1 &&
    character.speed_rating == 1
  end

  def is_invalid?(character)
    false
  end
end
