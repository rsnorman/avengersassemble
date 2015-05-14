require 'csv'

class CharacterCSVImporter

  def initialize(filepath)
    @filepath = filepath
  end

  def import
    attrs_names = ModelAttributes.new(Character).attribute_names

    CSV.foreach(@filepath) do |row|
      character = Character.new
      row.each_with_index do |cell, index|
        character.public_send("#{attrs_names[index]}=", cell)
      end
      character.save
    end
  end

end
