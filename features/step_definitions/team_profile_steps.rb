Given(/^a team exists$/) do
  @team = create_team
end

When(/^I visit the team profile$/) do
  @team_profile = TeamProfilePage.new
  @team_profile.load(team_id: @team.id)
end

Then(/^I see the team name$/) do
  expect(@team_profile).to have_team_name
end

Then(/^I see the leader avatar$/) do
  expect(@team_profile).to have_leader_avatar
end

Then(/^I see the team rank$/) do
  expect(@team_profile).to have_team_rank
end

Then(/^I see the team stats$/) do
  Stats::STAT_NAMES.each do |stat_name|
    expect(@team_profile.stats)
      .to have_stat(stat_name, @team.public_send("total_#{stat_name}"))
  end
end

Then(/^I see the superheroes on the team$/) do
  @team.characters.each_with_index do |character, index|
    expect(@team_profile.characters[index].name)
      .to have_content character.name
    expect(@team_profile.characters[index].avatar['src'])
      .to eq "http:#{character.thumbnail_image.url}"
    expect(@team_profile.characters[index].real_name)
      .to have_content character.real_name

    unless character.description.empty?
      expect(@team_profile.characters[index].description)
        .to have_content character.description
    end
  end
end

Then(/^I don't see the ability to edit the team$/) do
  expect(@team_profile).to_not have_edit_team_button
end

When(/^I visit my team profile$/) do
  step('I visit the team profile')
end

Then(/^I see the ability to edit my team$/) do
  expect(@team_profile).to have_edit_team_button
end

When(/^I click the button to edit my team$/) do
  @team_profile.edit_team_button.click
end

Then(/^I'm on the edit team page$/) do
  assemble_team_page = EditTeamPage.new
  expect(assemble_team_page).to be_displayed(team_id: @team.id)
end
