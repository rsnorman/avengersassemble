class CharacterPairs

  def initialize(characters)
    @characters = characters.to_a
  end

  def pairs
    other_characters = @characters.dup

    character_pairs = []
    @characters.each do |character|
      other_characters.each do |other_character|
        unless character.id == other_character.id
          character_pairs << [character, other_character]
        end
      end
      other_characters = other_characters.reject { |c| c.id == character.id }
    end

    character_pairs
  end

end
