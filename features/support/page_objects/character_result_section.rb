class CharacterResultSection < SitePrism::Section
  element :name, '.character-name'
  element :real_name, '.real-name'
  element :description, '.description'
  element :add_button, 'button', text: 'add_box'
end
