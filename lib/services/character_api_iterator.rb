class CharacterApiIterator

  PAGE_SIZE = 10
  START_OFFSET = 520

  def initialize(client = MarvelClient.new)
    @client = client
  end

  def each(&block)
    characters = []
    limit = PAGE_SIZE
    offset = START_OFFSET
    count = PAGE_SIZE
    character_data = @client.characters(limit: limit, offset: offset).data

    while character_data['total'] > offset + count
      puts "Got character data from API at offset: #{offset}"
      character_data['results'].each do |character|
        puts "Yield character #{character['name']}"
        block.call(character)
      end

      offset = character_data['offset'] + limit
      count = character_data['count']
      character_data = @client.characters(limit: limit, offset: offset).data
    end
  end
end
