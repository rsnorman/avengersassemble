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

def create_team(name)
  team = Team.new(
    name: name,
    user: create_user
  )

  Ratings::RATING_NAMES.each do |rating|
    team.public_send("total_#{rating}=", (1..7).to_a.sample)
  end

  team.total_experience  = (1500..2500).to_a.sample
  team.total_camaraderie = (50..200).to_a.sample
  team.score             = ScoreCalculator.new(team).score
  team.save
end

def create_user
  User.create(
    name:  ['Ryan Norman', 'Jessica Garvey', 'Dexter Beagle'].sample,
    image: 'http://graph.facebook.com/10100751232536290/picture?type=large'
  )
end
