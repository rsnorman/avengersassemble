class CharactersController < ApplicationController

  def image
    require 'open-uri'
    url = character.thumbnail_url
    url = "https:#{url}" unless url.include?('http')
    send_data open(url).read
  end

  private

  def character
    character = Character.find(params[:id])
  end

end
