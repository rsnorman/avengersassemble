class NewCharacterIterator

  def initialize( client = MarvelClient.new, iterator = CharacterApiIterator )
    @iterator = iterator.new(client)
  end

  def each(&block)
    imported_character_ids = Character.all.pluck(:marvel_id)
    # imported_character_names = Character.all.pluck(:name)

    @iterator.each do |api_character|
      next if api_character['name'] == 'S.H.I.E.L.D.'
      next if imported_character_ids.include?(api_character['id'])
      # next if imported_character_names.include?(api_character['name'])

      block.call(api_character)
    end
  end

end
