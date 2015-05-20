class SharedComicCamaraderie
  def initialize(team, client = MarvelClient.new)
    @team = team
    @client = client
  end

  def calculate
    comic_share_count = 0

    each_character_pair do |character, other_character|
      comic_share_count += @client.shared_comics_count(character, other_character)
    end

    comic_share_count
  end

  private

  def each_character_pair(&block)
    @shared_characters = {}
    @team.characters.each do |character|
      @team.characters.each do |other_character|
        next unless can_calculate?(character, other_character)
        mark_calculated(character, other_character)
        block.call(character, other_character)
      end
    end
  end

  def mark_calculated(character, other_character)
    @shared_characters[character.id] ||= []
    @shared_characters[other_character.id] ||= []
    @shared_characters[character.id] << other_character.id
    @shared_characters[other_character.id] << character.id
  end

  def can_calculate?(character, other_character)
    character.id != other_character.id &&
    !@shared_characters[character.id].try(:include?, other_character.id)
  end
end
