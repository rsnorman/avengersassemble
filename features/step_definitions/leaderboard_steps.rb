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
  step 'all the characters have been imported'
  3.times { create_team }
end

Then(/^I see the teams ranked from most powerful to least$/) do
  @leaderboard_page.wait_for_ranked_teams
  Team.order(score: :desc).each_with_index do |team, index|
    expect(@leaderboard_page.ranked_teams[index]).to have_team_name team.name
  end
end

When(/^I click on a team$/) do
  @leaderboard_page.ranked_teams.first.name.click
end

Then(/^I am taken to the team's profile$/) do
  team_profile_page = TeamProfilePage.new
  expect(team_profile_page)
    .to be_displayed(team_id: Team.order(score: :desc).first.id)
end
