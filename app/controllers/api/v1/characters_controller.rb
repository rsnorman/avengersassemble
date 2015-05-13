class Api::V1::CharactersController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: matching_characters}
    end
  end

  private

  def matching_characters
    CharacterSearch.new(Character.valid.original).matching(params[:query])
  end

end
