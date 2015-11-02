description = if character.description.to_s.empty?
                character.powers
              else
                character.description
              end

json.id character.id
json.name character.name
json.real_name character.real_name
json.description description
json.ratings character.ratings
json.experience(
  [UserTeamCreator::ALLOWED_CUMULATIVE_EXPERIENCE, character.experience].min
)
json.soldier_type character.soldier_type.name
json.thumbnail_url character.thumbnail_image.url
