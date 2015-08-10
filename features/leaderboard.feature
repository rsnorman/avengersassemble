@javascript
Feature: Leaderboard

  Scenario: Visiting leaderboard with no teams
    Given there are no teams
    When I visit the leaderboard
    Then I see the message that there are no teams

  Scenario: Visiting leaderboard with ranked teams
    Given there are multiple ranked teams
    When I visit the leaderboard
    Then I see the teams ranked from most powerful to least
    When I click on a team
    Then I am taken to the team's profile
