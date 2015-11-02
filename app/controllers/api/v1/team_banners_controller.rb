class Api::V1::TeamBannersController < ApplicationController

  def create
    @team_banner = TeamBanner.create(banner_params)
  end

  private

  def banner_params
    params.require(:banner).permit(:data).tap do |b_params|
      b_params[:team_id] = current_user.team.id
    end
  end

end
