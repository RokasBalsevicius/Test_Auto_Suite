Feature: Valid login feature

    Scenario: As a user, I can login with valid credentials

        Given User starts on the main page of Topocentras.lt
        When User clicks "Prisijungti" on the main page
        Then User can see login modal
        And User enters valid username and password
            | username | Hardsoll58@superrito.com |
            | password | password1!               |
        And User clicks on Prisijungti button
        Then User is logged in and sees Profile and Logout buttons
        And User is able to logout