class CharacterSearch
  def initialize(characters = Character.valid)
    @characters = characters
  end

  def matching(name)
    @characters.where("characters.name slike '%?%'", name)
  end
end
