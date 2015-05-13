class CharacterApiIterator

  def initialize(client = MarvelClient.new)
    @client = client
  end

  def each(&block)
    characters = []
    limit = 20
    offset = 0
    count = 20
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
