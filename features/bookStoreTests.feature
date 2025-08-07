Feature: Book Store Web Application full test suite
    @runthis
    Scenario: As a user, I can successfully use all Book Store Web Application main features

        Given User starts at Book Store registration page
        When User fills all registration fields and clicks "Register"
        Then User gets an alert indicating about successful registration
        When User goes to login page from registration page
        Then User is redirected to Login page
        When User fills login form and clicks login button
        Then User is able to successfully login

