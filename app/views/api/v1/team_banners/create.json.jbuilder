json.banner do
  json.url "#{url_host}/#{@team_banner.path}"
  json.team do
    json.partial! 'api/v1/teams/team', team: @team_banner.team
  end
end
