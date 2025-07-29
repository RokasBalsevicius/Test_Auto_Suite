Feature: Full form submission functionality testing

    Scenario: As a user, I can successfully fill and submit an extensive form

        Given User starts at the page with an empty form
        When User fills in the form correctly
        Then User can see successfully submitted form confirmation modal
        And User closes form submission confirmation modal
        Then Form submission confirmation modal no longer displayed
