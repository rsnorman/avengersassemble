class CharacterSearch
  
  NAME_CONDITIONS = <<-EOF
    lower(characters.name) LIKE ? OR
    lower(characters.real_name) LIKE ?
  EOF

  def initialize(characters = Character.all)
    @characters = characters
  end

  def matching(name)
    @characters.where(
      NAME_CONDITIONS, "%#{name.downcase}%", "%#{name.downcase}%"
    ).order('name ASC')
  end

end
