class CharacterUpdater

  def initialize(character_iterator = CharacterIterator.new)
    @character_iterator = character_iterator
  end

  def update_all
    @character_iterator.each do |character_data|
      puts "Updating #{character_data[:name]}…"
      character = Character.where(marvel_id: character_data[:marvel_id]).first

      unless character.nil?
        character.update_attributes(character_data)
      else
        Character.create(character_data)
      end
    end
  end

end
