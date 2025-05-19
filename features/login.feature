Feature: Simple page check

  Scenario: Verify homepage title
    Given I open the homepage
    Then the page title should be "The Internet"