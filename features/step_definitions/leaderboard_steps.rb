Given(/^there are no teams$/) do
  Team.destroy_all
end

When(/^I visit the leaderboard$/) do
  visit '/'
end

Then(/^I see the message that there are no teams$/) do
  expect(page).to have_content 'No one has created any teams'
end

Given(/^there are multiple ranked teams$/) do
  create_team('Ryan\'s Avengers')
  create_team('The Hairlip Sallys')
  create_team('Dexter\'s Ears')
end

Then(/^I see the teams ranked from most powerful to least$/) do
  within('#ranking_teams') do
    Team.order(score: :desc).each_with_index do |team, index|
      expect(all('.ranking-team')[index]).to have_content team.name
    end
  end
end
