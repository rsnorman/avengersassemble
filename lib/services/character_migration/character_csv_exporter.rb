require 'csv'

class CharacterCSVExporter

  def initialize(filepath)
    @filepath = filepath
  end

  def export(characters)
    attrs_names = ModelAttributes.new(Character).attribute_names

    CSV.open(@filepath, 'wb') do |row|
      characters.each do |character|
        row << attrs_names.collect do |a|
          character.public_send(a).try(:gsub, Regexp.new("\r\n|\n"), ' ')
        end
      end
    end
  end

end
