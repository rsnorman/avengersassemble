@javascript
Feature: Viewing an Team Profile

  Scenario: Visiting a team profile while not logged in
    Given all the characters have been imported
    And a team exists
    When I visit the team profile
    Then I see the team name
    And I see the leader avatar
    And I see the team rank
    And I see the team stats
    And I see the superheroes on the team
    And I don't see the ability to edit the team

  Scenario: Visiting another team's profile page
    Given all the characters have been imported
    And I am an authenticated user
    And my team exists
    And a team exists
    When I visit the team profile
    Then I see the team name
    And I see the leader avatar
    And I see the team rank
    And I see the team stats
    And I see the superheroes on the team
    And I don't see the ability to edit the team

  Scenario: Visiting your team profile page
    Given all the characters have been imported
    And I am an authenticated user
    And my team exists
    When I visit my team profile
    Then I see the ability to edit my team
    When I click the button to edit my team
    Then I'm on the edit team page
