json.leader do
  json.partial! 'api/v1/users/user', user: team.user
end

json.call(team, :id, :stats, :name, :description, :score)

if team.respond_to?(:rank)
  json.rank team.rank
else
  json.rank RankedTeams.new.rank_for_team(team)
end

json.characters team.characters do |character|
  json.partial! 'api/v1/characters/character', character: character
end
