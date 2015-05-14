require 'csv'

class CharacterCSVExporter

  def initialize(filepath)
    @filepath = filepath
  end

  def export(characters)
    attrs_names = ModelAttributes.new(Character).attribute_names

    CSV.open(@filepath, 'wb') do |row|
      characters.each do |character|
        row << attrs_names.collect { |a| character.public_send(a) }
      end
    end
  end

end
