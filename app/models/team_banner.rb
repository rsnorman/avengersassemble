class TeamBanner

  IMAGE_FOLDER_PATH     = Rails.root.join('public', 'images', 'banners').freeze
  TEAM_ID_REPLACE_TOKEN = 'BANNER_KEY'
  IMAGE_NAME_TEMPLATE   = "team_banner_#{TEAM_ID_REPLACE_TOKEN}.png"
  DATA_URL_PREFIX       = 'data:image/png;base64,'

  attr_reader :team, :path

  def self.create(attributes)
    fail ArgumentError, 'Need data attribute'    if attributes[:data].nil?
    fail ArgumentError, 'Need team_id attribute' if attributes[:team_id].nil?

    team = Team.find(attributes[:team_id])
    path = IMAGE_FOLDER_PATH.join(
      IMAGE_NAME_TEMPLATE.gsub(
        TEAM_ID_REPLACE_TOKEN, team.characters.pluck(:id).join('-')
      )
    ).tap(&:mkdir)

    unless File.exists?(path) || Rails.env.production?
      image_data = attributes[:data].gsub(DATA_URL_PREFIX, '')
      image_data = image_data.gsub(' ', '+')
      File.open(path, 'wb') { |f| f.write(Base64.decode64(image_data)) }
    end

    self.new(team, path)
  end

  def initialize(team, path)
    @team = team
    @path = path.to_s
  end

end
