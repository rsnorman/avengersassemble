class OriginalCharacterHydrator
  def initialize(characters = Character.original)
    @characters = characters
  end

  def hydrate
    count = 0
    while count < @characters.size
      character = @characters[count]
      dupe_character = @characters[count + 1]
      puts [character.name,
            dupe_character.name,
            character.experience,
            dupe_character.experience]

      if character.experience.to_i >= dupe_character.experience.to_i &&
         character.thumbnail_image.missing?
        character.update_attribute(:thumbnail_url, dupe_character.thumbnail_url)
      end

      if character.experience.to_i < dupe_character.experience.to_i
        name = character.name
        character.update_column(:name, "#{name} (Duplicate)")
        dupe_character.update_column(:name, name)

        temp_character = character
        character = dupe_character
        dupe_character = temp_character
      end

      character.update_attribute(:is_original, true)
      dupe_character.update_attribute(:original_character_id, character.id)

      count += 2
    end
  end
end
