class Api::V1::TeamsController < ApplicationController

  def index
    @teams = RankedTeams.new.rankings
  end

  def create
    @team = UserTeamCreator.new(current_user).assemble(params[:team])
  end

  def update
    @team = UserTeamCreator.new(current_user).assemble(params[:team])
  end

  private

  def team_params
    params.require(:team).permit(:name, :description, :character_ids)
  end

end
