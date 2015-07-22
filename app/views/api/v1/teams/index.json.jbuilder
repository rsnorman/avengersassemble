json.results @teams do |team|
  json.call(team, :id, :name, :description, :total_experience,
            :total_camaraderie, :total_strength, :total_intelligence,
            :total_energy, :total_fighting, :total_speed, :score)

  json.characters team.characters do |character|
    json.id character.id
    json.name character.name
    json.soldier_type character.soldier_type.name
    json.thumbnail_url character.thumbnail_url
  end
end

json.total @teams.count
