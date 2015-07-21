class SharedComicCamaraderie
  attr_reader :character, :other_character

  def initialize(character, other_character, client = MarvelClient.new)
    @character = character
    @other_character = other_character
    @client = client
  end

  def total
    @client.shared_comics_count(character, other_character)
  end

end
