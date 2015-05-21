class Api::V1::TeamsController < ApplicationController

  def create
    @team = TeamCreator.new.assemble(params[:team])
  end

  private

  def team_params
    params.require(:team).permit(:name, :description, :character_ids)
  end

end
