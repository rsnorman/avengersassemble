class CharacterImporter

  def initialize(character_iterator = CharacterIterator.new)
    @character_iterator = character_iterator
  end

  def import_all
    characters = []
    @character_iterator.each do |character_data|
      characters << import_character(character_data)
    end
    characters
  end

  def import_character(character_data)
    puts "\n\Importing #{character_data["name"]}…"

    Character.create(character_data)

  rescue
    puts "Failed to load character: #{character_data["name"]}"
  end

end
