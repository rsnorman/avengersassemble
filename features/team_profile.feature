@javascript
Feature: Viewing an Team Profile

  Scenario: Visiting not your team profile page
    Given all the characters have been imported
    And a team exists
    When I visit the team profile
    Then I see the team name
    And I see the leader avatar
    And I see the team rank
    And I see the team stats
    And I see the superheroes on the team
