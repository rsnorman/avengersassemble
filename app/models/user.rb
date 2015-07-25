class User < ActiveRecord::Base

  has_many :teams, dependent: :destroy

  class ProfileImageError < StandardError; end

  def self.from_omniauth(auth)
    where(provider: auth.provider,
          uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      #user.image = get_image_url(auth)
      user.image = auth.info.image
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  private

  def self.get_image_url(auth)
    uri = URI(auth.info.image)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = false
    response = http.get("#{url.path}?type=large&redirect=false")

    if response.is_a?(Net::HTTPOK)
      JSON.parse(response.body)['data']['url']
    else
      fail ProfileImageError, 'Could not fetch from facebook'
    end
  end

end
