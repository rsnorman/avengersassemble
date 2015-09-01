if Rails.env.development?
  FACEBOOK_APP_ID = '1627640444115447'.freeze
  FACEBOOK_OPEN_GRAPH_NAMESPACE = 'avengersassembletest'.freeze
else
  FACEBOOK_APP_ID = '1627567727456052'.freeze
  FACEBOOK_OPEN_GRAPH_NAMESPACE = 'assembleavengers'.freeze
end
