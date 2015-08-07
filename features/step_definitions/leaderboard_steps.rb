Given(/^there are no teams$/) do
  Team.destroy_all
end

When(/^I visit the leaderboard$/) do
  @leaderboard_page = LeaderboardPage.new
  @leaderboard_page.load
end

Then(/^I see the message that there are no teams$/) do
  expect(@leaderboard_page).to have_no_ranked_teams
end

Given(/^there are multiple ranked teams$/) do
  create_team('Ryan\'s Avengers')
  create_team('The Hairlip Sallys')
  create_team('Dexter\'s Ears')
end

Then(/^I see the teams ranked from most powerful to least$/) do
  @leaderboard_page.wait_for_ranked_teams
  Team.order(score: :desc).each_with_index do |team, index|
    expect(@leaderboard_page.ranked_teams[index]).to have_team_name team.name
  end
end
