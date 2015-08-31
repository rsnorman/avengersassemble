class ThumbnailImage

  MISSING_IMAGE_PATH = 'image_not_available.jpg'.freeze

  def initialize(url)
    @url = url
  end

  def missing?
    @url.include?(MISSING_IMAGE_PATH)
  end

  def url
    _url = @url.gsub(/(?:http|https):/, '')
  end

end
