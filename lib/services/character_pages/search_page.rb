class SearchPage

  URL = 'http://marvel.com/search/?q=NAME&category=characters'.freeze
  BIO_SELECTOR = '#browse_results h4 a'.freeze

  def initialize(character_name)
    @character_name = character_name
  end

  def visit
    response = HTTParty.get(URL.gsub('NAME', CGI.escape(@character_name)))
    @html_doc = Nokogiri::HTML(response.body)
    self
  rescue
    puts "Bad search param: #{@character_name}"
    raise URL.gsub('NAME', CGI.escape(@character_name))
  end

  def bio_url
    return nil if @html_doc.nil?
    @html_doc.css(BIO_SELECTOR, text: @character_name).first['href'] rescue nil
  end

end
