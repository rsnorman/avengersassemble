Given(/^I am an authenticated user$/) do
  @user = create_user
  page.set_rack_session(user_id: @user.id)
end

Given(/^I have not created a team$/) do
  @user.teams.destroy_all
end

Given(/^all the characters have been imported$/) do
  file = "db/characters-2015-5-20.csv"
  exporter = CharacterCSVImporter.new(file)
  exporter.import
end

When(/^I visit the assemble team page$/) do
  visit '/teams/new'
end

When(/^I search for (.*)$/) do |character_name|
  within '.character-search-field' do
    fill_in 'character-search', with: character_name
  end
end

Then(/^I see (.*) in the results$/) do |character_name|
  within '#character_results' do
    expect(page).to have_content character_name
  end
end

When(/^I add (.*) to my team$/) do |character_name|
  within "#character_result_#{find_character(character_name).id}" do
    find('button', text: 'add_box').click
  end
end

Then(/^I see (.*) added to my team$/) do |character_name|
  within '#team_characters' do
    expect(page)
      .to have_css "#team_character_#{find_character(character_name).id}"
  end
end

Then(/^I should see an alert that (.*) has already been added$/) do |character_name|
  within '#notifications' do
    expect(page).to have_content "You already added #{character_name}"
  end
end

Then(/^I don't see (.*) on my team$/) do |character_name|
  within '#team_characters' do
    expect(page)
      .to_not have_css "#team_character_#{find_character(character_name).id}"
  end
end

Then(/^I see an alert that my team is too powerful$/) do
  within '#notifications' do
    expect(page).to have_content 'Your team is too powerful'
  end
end

Then(/^I should be able to assemble my team$/) do
  within '#create_team_button' do
    expect(page).to have_button 'build', disabled: false
  end
end

When(/^I remove (.*) from my team$/) do |character_name|
  find("#team_character_#{find_character(character_name).id}").click
end

Then(/^I should not be able to assemble my team$/) do
  within '#create_team_button' do
    expect(page).to have_button 'build', disabled: true
  end
end

When(/^I assemble my team$/) do
  within '#create_team_button' do
    click_button 'build'
  end
end

Then(/^I should see that my team is being assembled$/) do
  within '#team_creator_feedback' do
    expect(page)
      .to have_content 'Give us a second while we assemble your Avengers…'
  end
end

Then(/^I should see my team on the leaderboard$/) do
  within '#ranking_teams' do
    expect(page).to have_content "#{@user.name}'s Avengers"
  end
end

def find_character(name)
  @characters ||= {}
  @characters[name] ||= Character.find_by(name: name)
end

def create_user
  User.create(
    name:  ['Ryan Norman', 'Jessica Garvey', 'Dexter Beagle'].sample,
    image: 'http://graph.facebook.com/10100751232536290/picture?type=large'
  )
end
