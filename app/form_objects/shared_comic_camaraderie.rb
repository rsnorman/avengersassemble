class SharedComicCamaraderie
  attr_reader :character, :other_character

  def initialize(character, other_character, client = MarvelClient.new)
    @character = character
    @other_character = other_character
    @client = client
  end

  def total
    Rails.cache.fetch("#{cache_key}/camaraderie", expires_in: 4.weeks) do
      @client.shared_comics_count(character, other_character)
    end
  end

  private

  def cache_key
    character_ids = [@character.id, @other_character.id].sort
    character_ids.join('_')
  end

end
