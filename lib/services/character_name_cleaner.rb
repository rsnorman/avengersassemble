class CharacterNameCleaner
  def initialize(characters = Character.original)
    @characters = characters
  end

  def clean
    cleaned_characters = []
    @characters.each do |character|
      cleaned_name = character.name.gsub(/\s\(.*\)/, '').split('/').first
      if cleaned_name != character.name
        cleaned_characters << character
        character.update_attribute(:name, cleaned_name)
      end
    end

    cleaned_characters
  end
end
