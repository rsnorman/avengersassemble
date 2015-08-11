json.results do
  json.partial! 'api/v1/teams/team', collection: @teams
end

json.total @teams.count
