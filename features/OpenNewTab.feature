Feature: Opening page in new tab feature

    Scenario: As a user, I can open another page in a new tab
    
        Given User starts on the main page of Topocentras.lt
        When User clicks on "Mokėjimo būdai" hyperlink at footer
        Then User can see page content title "Mokėjimo būdai"