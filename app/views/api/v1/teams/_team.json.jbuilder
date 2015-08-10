json.leader do
  json.partial! 'api/v1/users/user', user: team.user
end

json.call(team, :id, :rank, :stats, :name, :description, :score)

json.characters team.characters do |character|
  json.partial! 'api/v1/characters/character', character: character
end
