Feature: Adding product to cart

    Scenario: As a user, I can add item to cart by selecting the quantity from dropdown

        Given User starts on the main page of Topocentras.lt
        When User navigates to "Kompiuterinė technika" categorie
        Then User can see list of sub-categories for "Kompiuterinė technika" category
        When When user clicks on "Nešiojami kompiuteriai"
        Then User is redirected and can see laptop products
        When User add the first item in product list to cart
        Then Product is successfully added to cart and confirmation modal appears