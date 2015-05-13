class CharacterIterator

  def initialize( iterator = CharacterApiIterator,
                  wiki     = CharacterWiki,
                  client   = MarvelClient )
    @iterator = iterator.new(client.new)
    @wiki     = wiki
  end

  def each(&block)
    last_character = nil

    @iterator.each do |api_character|
      last_character = api_character

      wiki_attributes = @wiki.new(api_character['name']).attributes
      hero_name       = wiki_attributes.delete(:hero_name)

      block.call({
        name: api_character['name'],
        description: api_character['description'],
        marvel_id: api_character['id'],
        is_original: hero_name == api_character['name'],
        thumbnail_url: concat_image_url(api_character["thumbnail"])
      }.merge(wiki_attributes))
    end
  rescue Exception => e
    puts "Failed on #{last_character['name']}"
    raise e
  end

  private

  def concat_image_url(image_url_pieces)
    "#{image_url_pieces["path"]}.#{image_url_pieces["extension"]}"
  end

end
