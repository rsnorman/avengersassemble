json.call(@team, :id, :name, :description, :total_experience,
          :total_camaraderie, :total_strength, :total_intelligence,
          :total_energy, :total_fighting, :total_speed)

json.characters @team.characters do |character|
  json.id character.id
  json.name character.name
  json.real_name character.real_name
  json.description character.description.to_s.empty? ? character.powers : character.description
  json.ratings character.ratings
  json.experience character.experience
  json.soldier_type character.soldier_type.name
  json.thumbnail_url character.thumbnail_url
end
