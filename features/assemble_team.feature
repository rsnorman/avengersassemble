@javascript @vcrpath @slow_selenium @clear_cache
Feature: Assembling Team

  Scenario: Creating a team and saving while logged in
    Given all the characters have been imported
    And I am an authenticated user
    And I have not created a team
    When I visit the assemble team page
    When I search for iron
    Then I see Iron Man in the results
    When I add Iron Man to my team
    Then I see Iron Man added to my team
    When I search for Black Widow
    Then I see Black Widow in the results
    When I add Black Widow to my team
    Then I see Black Widow added to my team
    When I add Black Widow to my team
    Then I should see an alert that Black Widow has already been added
    When I search for Captain America
    Then I see Captain America in the results
    When I add Captain America to my team
    Then I don't see Captain America on my team
    And I see an alert that my team is too powerful
    When I search for Jubilee
    Then I see Jubilee in the results
    When I add Jubilee to my team
    Then I see Jubilee added to my team
    When I search for May Parker
    Then I see May Parker in the results
    When I add May Parker to my team
    Then I see May Parker added to my team
    When I search for Groot
    Then I see Groot in the results
    When I add Groot to my team
    Then I see Groot added to my team
    Then I should be able to assemble my team
    When I remove Groot from my team
    Then I don't see Groot on my team
    Then I should not be able to assemble my team
    When I add Groot to my team
    Then I see Groot added to my team
    When I add Groot to my team
    Then I see an alert that my team is full
    When I assemble my team
    Then I should see that my team is being assembled
    And I should see my team on the leaderboard
