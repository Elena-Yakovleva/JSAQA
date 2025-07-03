Feature: Book a seat in the movie viewing app
    Scenario: Successful transition to cinema's page
        Given user is on "/index.php" page
        When user chooses a random date
        When user chooses a random time
        Then user sees page hall
        And page URL matches the expected one
        And user takes a screenshot of the page

    Scenario: Successful registration of an electronic ticket
        Given user is on "/index.php" page site
        When user chooses a random date film
        And chooses a random time
        And sees page hall
        When user has selected an empty seat in the hall
        And confirmed the purchase
        Then user saw the ticket page
        Then page URL matches the expected one result
        And QR code is available on the page
        Then user takes a screenshot of this the page

    Scenario: Refusal  book previously registered seat
        Given user is on "/index.php" page of the cinema website
        When user has registered a ticket for a certain place
        And same user tries to re-purchase a ticket for same location
        Then system should  show that booking button is not active
        And take screenshot this page