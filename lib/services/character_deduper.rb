class CharacterDeduper
  def initialize(characters = Character.all)
    @characters = characters
  end

  def dedupe
    @characters.group_by(&:wiki_id).each_pair do |_wiki_id, characters|
      original_character = get_original_character(characters)

      byebug if original_character.nil?

      original_character.update_attribute(:is_original, true)
      dupe_characters = characters.select { |c| c.id != original_character.id }

      Character
        .where(id: dupe_characters.collect(&:id))
        .update_all(original_character_id: original_character.id)
    end
  end

  private

  def get_original_character(characters)
    return characters.first if characters.size == 1

    original_character = characters.detect(&:is_original)

    if original_character.nil?
      parens_characters     = characters_with_parentheses(characters)
      non_parens_characters = characters_without_parentheses(characters)
      revealed_character    = character_with_real_name(characters)

      bad_characters  = (parens_characters + [revealed_character]).compact
      good_characters = non_parens_characters - bad_characters

      if good_characters.size == 1
        original_character = good_characters.first
      else
        original_character ||= characters.detect do |c|
          !c.description.empty? &&
          !c.ratings.missing? &&
          !c.thumbnail_image.missing?
        end
        original_character ||= characters.detect do |c|
          !c.description.empty? && !c.ratings.missing?
        end
        original_character ||= characters.detect do |c|
          !c.description.empty?
        end
      end

      original_character = characters.first if original_character.nil?
    end

    original_character
  end

  def characters_with_parentheses(characters)
    characters.select { |c| /.*\(.*\)/ =~ c.name }
  end

  def characters_without_parentheses(characters)
    characters.select { |c| !(/.*\(.*\)/ =~ c.name) }
  end

  def character_with_real_name(characters)
    characters.detect { |c| c.name == c.real_name }
  end
end
