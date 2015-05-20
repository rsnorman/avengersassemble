class DuplicateCharacters

  def initialize(characters = Character.all)
    @characters = characters
  end

  def all
    dupes = @characters.where('name LIKE ?', "%(Duplicate)")
    dupe_names = dupes.collect { |d| d.name.gsub(' (Duplicate)', '') }
    original = @characters.where(name: dupe_names)
    original.concat(dupes).sort {|x,y| x.name <=> y.name }
  end

end
