class CharacterApiIterator

  PAGE_SIZE = 10
  START_OFFSET = 520

  def initialize(client = MarvelClient.new)
    @client = client
  end

  def each(&block)
    count = PAGE_SIZE
    character_data = get_character_data

    while character_data['total'] > offset + count
      puts "Got character data from API at offset: #{offset}"
      character_data['results'].each { |c| iterate_character(c, &block) }

      offset = character_data['offset'] + PAGE_SIZE
      count = character_data['count']
      character_data = get_character_data(offset)
    end
  end

  private

  def iterate_character(character, &block)
    puts "Yield character #{character['name']}"
    block.call(character)
  end

  def get_character_data(offset = START_OFFSET)
    @client.characters(limit: PAGE_SIZE, offset: offset).data
  end
end
