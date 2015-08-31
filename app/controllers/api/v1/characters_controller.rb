module Api
  module V1
    class CharactersController < ApplicationController

      def index
        @characters = matching_characters
      end

      def camaraderie
        render json: { total: character_camaraderie }
      end

      private

      def matching_characters
        CharacterSearch.new(Character.valid.original).matching(params[:query])
      end

      def character_camaraderie
        character = Character.find(params[:character_id])
        other_character = Character.find(params[:other_character_id])
        SharedComicCamaraderie.new(character, other_character).total
      end

    end
  end
end
