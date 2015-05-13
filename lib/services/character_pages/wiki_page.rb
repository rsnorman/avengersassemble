class WikiPage

  INFO_SELECTOR      = '#powerbox p'.freeze
  POWERS_SELECTOR    = '#char-powers-content'.freeze
  WIKI_LINK_SELECTOR = '#connections_lnk a'.freeze
  HERO_NAME_SELECTOR = 'h1.taxon-h1'.freeze
  REAL_NAME_POS      = 1

  def initialize(wiki_url)
    raise ArgumentError.new('Wiki URL cannot be nil') if wiki_url.nil?

    @wiki_url = wiki_url
  end

  def visit
    wiki_response = HTTParty.get(@wiki_url)
    @html_page    = Nokogiri::HTML(wiki_response.body)
    self
  end

  def hero_name
    @html_page.css(HERO_NAME_SELECTOR).first.text
  end

  def real_name
    name_el = @html_page.css(INFO_SELECTOR)[REAL_NAME_POS]
    !name_el.nil? ? name_el.text.strip.gsub('Real Name', '') : 'Unknown'
  end

  def powers
    @html_page.css(POWERS_SELECTOR).text
  end

  def wiki_id
    @wiki_id ||= begin
      wiki_link = @html_page.css(WIKI_LINK_SELECTOR).first
      wiki_link["href"].split('character_id=').last.to_i if wiki_link
    end
  end

end
