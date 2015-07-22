class DupeCharacterIterator

  def initialize(wiki = CharacterWiki)
    @wiki = wiki
  end

  def each(&block)
    Character.valid.group_by(&:wiki_id).each_pair do |_wiki_id, characters|
      next if characters.size <= 1

      characters.each do |character|
        wiki_attributes = @wiki.new(character.name).attributes
        hero_name       = wiki_attributes.delete(:hero_name)

        block.call({
          name: character.name,
          description: character.description,
          marvel_id: character.marvel_id,
          is_original: hero_name == character.name,
          thumbnail_url: character.thumbnail_url
        }.merge(wiki_attributes))
      end
    end
  end

end
