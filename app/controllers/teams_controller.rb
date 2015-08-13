class TeamsController < ApplicationController

  def index
    @teams = RankedTeams.new.rankings
  end

  def show
    @team = Team.find(params[:id])
  end

  def edit
    @team = current_user.team
  end

end
