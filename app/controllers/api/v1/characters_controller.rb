class Api::V1::CharactersController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: matching_characters}
    end
  end

  private

  def matching_characters
    CharacterSearch.new(marvel_client).matching(params[:query])
  end

end
