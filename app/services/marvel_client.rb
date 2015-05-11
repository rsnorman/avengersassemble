class MarvelClient
  delegate :characters, to: :@client

  def initialize
    @client = Marvelite::API::Client.new(
      public_key:  '534a1c83ec57591f6de64ea33b87d483',
      private_key: 'f12aa40d394a82ae7b0ebe08351310e87cf50d9c'
    )
  end
end
