class CharacterImporter

  def initialize(client = MarvelClient.new)
    @client = client
  end

  def import_all
    characters = []
    limit = 20
    offset = 0
    count = 20
    character_data = @client.characters(limit: limit, offset: offset).data

    while character_data["total"] > offset + count do
      character_data["results"].each do |character|
        characters << save_character(character)
      end

      offset = character_data["offset"] + limit
      count = character_data["count"]
      character_data = @client.characters(limit: limit, offset: offset).data
    end
  end

  def save_character(character_data)
    puts "\n\nSaving #{character_data["name"]}…"
    bio_url = get_bio_url(character_data["name"])
    wiki_url = get_wiki_url(bio_url) if bio_url
    extra_character_data =  wiki_url.nil? ? {} : scrape_wiki_page(wiki_url)

    Character.create(extra_character_data.merge(
      name: character_data['name'],
      marvel_id: character_data['id'],
      thumbnail_url: "#{character_data["thumbnail"]["path"]}.#{character_data["thumbnail"]["extension"]}"
    ))
    
  rescue
    puts "Failed to load character: #{character_data["name"]}"
  end

  def get_bio_url(name)
    puts "Getting bio for #{name}"
    response = HTTParty.get("http://marvel.com/search/?q=#{name}&category=characters")
    html_doc = Nokogiri::HTML(response.body)
    result = html_doc.css('#browse_results h4 a', text: name).first["href"]
  end

  def get_wiki_url(bio_url)
    puts "Getting wiki from #{bio_url}"
    bio_page_response = HTTParty.get("http://marvel.com#{bio_url}")
    bio_doc = Nokogiri::HTML(bio_page_response.body)
    wiki_link = bio_doc.css('a.featured-item-notice.primary').first
    wiki_link["href"] unless wiki_link.nil?
  end

  def scrape_wiki_page(wiki_url)
    puts "Scrapig wiki page at #{wiki_url}"
    character_data = {}

    wiki_response = HTTParty.get(wiki_url)
    wiki_doc = Nokogiri::HTML(wiki_response.body)
    info_div = wiki_doc.css('#powerbox')

    real_name = info_div.css('p')[1].text.strip.gsub('Real Name', '')
    powers = wiki_doc.css('#char-powers-content').text
    wiki_link = wiki_doc.css('#connections_lnk a').first
    wiki_id = wiki_link["href"].split('character_id=').last.to_i if wiki_link

    ratings = scrape_character_ratings(wiki_id) unless wiki_id.nil?

    {
      real_name: real_name,
         powers: powers,
        wiki_id: wiki_id,
    }.merge(ratings || {})
  end

  def scrape_character_ratings(char_wiki_id)
    puts "Scraping ratings from #{char_wiki_id}"
    ratings_data = {}
    rating_response = HTTParty.get("https://marvel.com/universe3zx/utility/ratings.php?page_id=#{char_wiki_id}")
    rating_doc = Nokogiri::XML(rating_response.body)
    ratings = rating_doc.xpath('//power_ratings//item/rating[@type="official"]/stat')
    ratings.each do |rating|
      ratings_data["#{rating["type"]}_rating".to_sym] = rating["value"].to_i
    end
    ratings_data
  end

end
