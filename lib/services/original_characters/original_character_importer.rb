class OriginalCharacterImporter
  def initialize(new_character_iterator = NewCharacterIterator.new,
                  character_importer = CharacterImporter.new,
                  wiki = CharacterWiki)
    @new_character_iterator = new_character_iterator
    @character_importer = character_importer
    @wiki = wiki
  end

  def import_all
    @new_character_iterator.each do |character_data|
      new_name = character_data['name']
      current_character = Character.original.where(name: new_name).first
      puts "New Character: #{new_name}"

      unless current_character.nil?
        next "Skip character: #{new_name}" if new_name =~ /\s\(.*\)/
        if current_character.experience.to_i >= character_data['comics']['available']
          next "Skip character: #{new_name}"
        end
      end

      ActiveRecord::Base.transaction do
        unless current_character.nil?
          current_character.update_attributes(name: "#{new_name} (Duplicate)",
                                              is_original: false)
        end

        wiki_attributes = @wiki.new(new_name).attributes
        wiki_attributes.delete(:hero_name)

        Character.create!({
          name: character_data['name'],
          description: character_data['description'],
          marvel_id: character_data['id'],
          experience: character_data['comics']['available'],
          is_original: true,
          thumbnail_url: concat_image_url(character_data['thumbnail'])
        }.merge(wiki_attributes))
      end
    end
  end

  private

  def concat_image_url(image_url_pieces)
    return ThumbnailImage::MISSING_IMAGE_PATH if image_url_pieces.nil?
    "#{image_url_pieces['path']}.#{image_url_pieces['extension']}"
  end
end
