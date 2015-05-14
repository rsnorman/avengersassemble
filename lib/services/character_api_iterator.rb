class CharacterApiIterator

  PAGE_SIZE = 100

  def initialize(client = MarvelClient.new)
    @client = client
  end

  def each(&block)
    characters = []
    limit = PAGE_SIZE
    offset = 0
    count = PAGE_SIZE
    character_data = @client.characters(limit: limit, offset: offset).data

    while character_data["total"] > offset + count do
      character_data["results"].each do |character|
        block.call(character)
      end

      offset = character_data["offset"] + limit
      count = character_data["count"]
      character_data = @client.characters(limit: limit, offset: offset).data
    end
  end
end
