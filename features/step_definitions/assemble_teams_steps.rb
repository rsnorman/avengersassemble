Given(/^I have not created a team$/) do
  @user.team.try(:destroy)
end

Given(/^all the characters have been imported$/) do
  file = "features/support/fixtures/characters.csv"
  exporter = CharacterCSVImporter.new(file)
  exporter.import
end

When(/^I visit the assemble team page$/) do
  @assemble_team_page = NewTeamPage.new
  @assemble_team_page.load
end

When(/^I search for (.*)$/) do |character_name|
  @assemble_team_page.search_field.set character_name
end

Then(/^I see (.*) in the results$/) do |character_name|
  expect(@assemble_team_page).to have_character_results text: character_name
end

When(/^I add (.*) to my team$/) do |character_name|
  @assemble_team_page.add_character(character_name)
end

Then(/^I see (.*) added to my team$/) do |character_name|
  expect(@assemble_team_page).to have_team_member character_name
end

Then(/^I should see an alert that (.*) has already been added$/) do |character_name|
  expect(notifications).to have_message "You already added #{character_name}"
end

Then(/^I don't see (.*) on my team$/) do |character_name|
  expect(@assemble_team_page).to_not have_team_member character_name
end

Then(/^I see an alert that my team is too powerful$/) do
  expect(notifications).to have_message 'Your team is too powerful'
end

Then(/^I see an alert that my team is full$/) do
  expect(notifications).to have_message 'Your team has too many superheroes'
end

Then(/^I should be able to assemble my team$/) do
  expect(@assemble_team_page.assemble_button['disabled']).to be_nil
end

When(/^I remove (.*) from my team$/) do |character_name|
  @assemble_team_page.find_team_member(character_name).click
end

Then(/^I should not be able to assemble my team$/) do
  expect(@assemble_team_page.assemble_button['disabled']).to eq 'true'
end

When(/^I assemble my team$/) do
  @assemble_team_page.assemble_button.click
end

Then(/^I should see that my team is being assembled$/) do
  expect(@assemble_team_page.creator_feedback).to have_assembling_team_message
end

Then(/^I should see that my team is successfully assembled$/) do
  @assemble_team_page.creator_feedback.wait_for_avengers_assembled_message
end

Then(/^I should be taken to my team profile$/) do
  while Team.count.zero?; end
  @team_profile_page = TeamProfilePage.new
  expect(@team_profile_page).to be_displayed(team_id: Team.last.id)
end

When(/^I visit my assemble team page$/) do
  @assemble_team_page = EditTeamPage.new
  @assemble_team_page.load(team_id: @team.id)
end

Then(/^I remove a character$/) do
  step("I remove #{@team.characters.last.name} from my team")
end

When(/^I add a new character$/) do
  @new_character =
    Character.find(Character.where(experience: 0).pluck(:id).sample)
  while @team.characters.pluck(:id).include?(@new_character.id)
    @new_character = Character.find(Character.pluck(:id).sample)
  end
  step("I search for #{@new_character.name}")
  step("I see #{@new_character.name} in the results")
  step("I add #{@new_character.name} to my team")
end

Then(/^I have the new character on my team profile$/) do
  step("I see #{@new_character.name} on my team profile")
end

Then(/^I see (.*) on my team profile$/) do |character_name|
  expect(@team_profile_page).to have_character(character_name)
end
