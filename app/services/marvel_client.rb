require 'yaml'

class MarvelClient

  class MarvelClientError < Exception; end

  delegate :characters, to: :@client
  delegate :comics, to: :@client

  def initialize
    @client = Marvelite::API::Client.new(
      public_key:  MarvelClient.public_key,
      private_key: MarvelClient.private_key
    )
  end

  def shared_comics_count(character, other_character)
    shared_comic_data = get_shared_comics(character, other_character)

    if shared_comic_data.key?('data')
      shared_comic_data['data']['total']
    else
      fail MarvelClientError.new(marvel_client_error_message)
    end
  end

  private

  def marvel_client_error_message(comic_data)
    'Marvel API returned incorrectly formatted response:' \
    "#{comic_data.inspect} <#{inspect}>"
  end

  def get_shared_comics(character, other_character)
    character_ids = [character.marvel_id, other_character.marvel_id].join(',')

    comics(
      sharedAppearances: character_ids,
      limit: 1
    )
  end

  def self.public_key
    ENV['marvel_public_key'] || config['marvel']['public_key']
  end

  def self.private_key
    ENV['marvel_private_key'] || config['marvel']['private_key']
  end

  def self.config
    @config ||= YAML.load(File.read(Rails.root.join('marvel_keys.yml')))
  end

end
