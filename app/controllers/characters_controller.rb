class CharactersController < ApplicationController

  def image
    send_data character_image
  end

  private

  def character_image
    cache("character_image_#{params[:id]}") do
      require 'open-uri'
      url = character.thumbnail_url
      url = "https:#{url}" unless url.include?('http')
      open(url).read
    end
  end

  def character
    character = Character.find(params[:id])
  end

end
