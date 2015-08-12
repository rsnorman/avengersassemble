Given(/^I am an authenticated user$/) do
  @user = create_user
  page.set_rack_session(user_id: @user.id)
end

Given(/^my team exists$/) do
  @team = create_team(@user)
end
