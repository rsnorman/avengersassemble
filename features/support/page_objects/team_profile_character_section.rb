class TeamProfileCharacterSection < SitePrism::Section
  element :avatar,      '.character-avatar'
  element :name,        '.character-name'
  element :real_name,   '.character-real-name'
  element :description, '.character-description'
end
