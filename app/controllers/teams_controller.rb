class TeamsController < ApplicationController

  def index
    @teams = RankedTeams.new.rankings
  end

  def show
    @team = Team.find(params[:id])
  end

  def edit
    @team = Team.find(params[:id])
  end

end
