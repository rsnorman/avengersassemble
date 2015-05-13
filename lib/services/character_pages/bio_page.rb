class BioPage

  WIKI_SELECTOR = 'a.featured-item-notice.primary'.freeze

  def initialize(character_bio_url)
    @character_bio_url = character_bio_url
  end


  def visit
    response = HTTParty.get("http://marvel.com#{@character_bio_url}")
    @html_doc = Nokogiri::HTML(response.body)
    self
  end

  def wiki_url
    wiki_link = @html_doc.css(WIKI_SELECTOR).first
    wiki_link["href"] unless wiki_link.nil?
  end

end
