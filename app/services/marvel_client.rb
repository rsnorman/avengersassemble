require 'yaml'

class MarvelClient

  class MarvelClientError < Exception; end;

  delegate :characters, to: :@client
  delegate :comics, to: :@client

  def initialize
    @client = Marvelite::API::Client.new(
      public_key:  MarvelClient.public_key,
      private_key: MarvelClient.private_key
    )
  end

  def shared_comics_count(character, other_character)
    puts "Finding shared comics between: #{character.name} and #{other_character.name}"
    character.marvel_id = 1009368 if character.name.include?('Iron Man')
    other_character.marvel_id = 1009368 if other_character.name.include?('Iron Man')

    character.marvel_id = 1009351 if character.name.include?('Hulk/Bruce Banner (MAA)')
    other_character.marvel_id = 1009351 if other_character.name.include?('Hulk/Bruce Banner (MAA)')

    comic_data = comics(
              sharedAppearances: [character.marvel_id, other_character.marvel_id].join(','),
              limit: 1
            )

    if comic_data.has_key?('data')
      count = comic_data['data']['total']
      puts "Found #{count} shared comics"
      count
    else
      raise MarvelClientError.new("Marvel API returned incorrectly formatted response: #{comic_data.inspect} <#{self.inspect}>")
    end
  end

  private

  def self.public_key
    ENV['marvel_public_key'] || config['marvel']['public_key']
  end

  def self.private_key
    ENV['marvel_public_key'] || config['marvel']['private_key']
  end

  def self.config
    @config ||= YAML.load(File.read(Rails.root.join('marvel_keys.yml')))
  end

end
