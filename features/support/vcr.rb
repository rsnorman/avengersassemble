VCR.configure do |c|
  c.cassette_library_dir = 'features/support/vcr_cassettes'
  c.hook_into :webmock
  c.allow_http_connections_when_no_cassette = false
  c.ignore_localhost = true
end

VCR.cucumber_tags do |t|
  t.tag '@vcr', use_scenario_name: true
  t.tag '@vcrpath', use_scenario_name: true, match_requests_on: [:method, :path]
end
