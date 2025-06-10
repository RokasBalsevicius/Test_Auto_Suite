Feature: Locale check - language change

    Scenario: As a user, I am able to change desired language on website

        Given User starts at Betsafe.lt main page
        When User selects "lt" from the language dropdown
        Then User can see page content translated in selected language "lt"
        When User selects "en" from the language dropdown
        Then User can see page content translated in selected language "en"
        When User selects "ru" from the language dropdown
        Then User can see page content translated in selected language "ru"