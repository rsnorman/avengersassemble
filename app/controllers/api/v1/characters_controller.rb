class Api::V1::CharactersController < ApplicationController

  def index
    @characters = matching_characters
  end

  private

  def matching_characters
    CharacterSearch.new(Character.valid.original).matching(params[:query])
  end

end
