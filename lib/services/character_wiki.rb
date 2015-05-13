class CharacterWiki
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def attributes
    unless wiki_page.nil?
      {
        wiki_id: wiki_page.wiki_id,
        hero_name: wiki_page.hero_name,
        real_name: wiki_page.real_name,
        powers: wiki_page.powers
      }.merge(ratings_page.ratings)
    else
      {}
    end
  end

  private

  def wiki_page
    @wiki_page ||= WikiPage.new(wiki_url).visit unless wiki_url.nil?
  end

  def ratings_page
    @ratings_page ||= RatingsPage.new(wiki_page.wiki_id).visit
  end

  def wiki_url
    @wiki_url ||= BioPage.new(bio_url).visit.wiki_url
  end

  def bio_url
    @bio_url ||= SearchPage.new(@name).visit.bio_url
  end
end
