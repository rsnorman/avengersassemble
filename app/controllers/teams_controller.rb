class TeamsController < ApplicationController

  def index
    @teams = RankedTeams.new(Team.all.includes(:characters, :user)).rankings
  end

  def show
    @team = Team.find(params[:id])
  end

  def edit
    @team = current_user.team
  end

end
