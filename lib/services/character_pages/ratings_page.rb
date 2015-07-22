class RatingsPage

  URL        = 'https://marvel.com/universe3zx/utility/ratings.php?page_id=WIKI_ID'.freeze
  STAT_XPATH = '//power_ratings//item/rating[@type="official"]/stat'.freeze

  def initialize(wiki_id)
    @wiki_id = wiki_id
  end

  def visit
    rating_response = HTTParty.get(URL.gsub('WIKI_ID', @wiki_id.to_s))
    @xml_page = Nokogiri::XML(rating_response.body)
    self
  end

  def ratings
    ratings_data    = {}
    rating_elements = @xml_page.xpath(STAT_XPATH)

    rating_elements.each do |rating|
      ratings_data["#{rating['type']}_rating".to_sym] = rating['value'].to_i
    end
    ratings_data
  end

end
