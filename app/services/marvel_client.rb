require 'yaml'

class MarvelClient

  delegate :characters, to: :@client

  def initialize
    @client = Marvelite::API::Client.new(
      public_key:  MarvelClient.public_key,
      private_key: MarvelClient.private_key
    )
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
