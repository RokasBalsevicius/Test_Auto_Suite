Feature: drop-down selection feature test

    @needs-item-in-cart
    Scenario: As a user, I can select desired option from a dropdown list

        Given User start at Cart page with already added item
        When User selects insurance plan
        Then Additional insurance plan price displayed in price calculation