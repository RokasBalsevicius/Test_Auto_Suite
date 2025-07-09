Feature: File upload functionality test

    Scenario: As a user, I can upload a file

        Given User starts at the dedicated page for file upload test
        When User selects a file to upload and submits
        Then User can see successfully uploaded file
