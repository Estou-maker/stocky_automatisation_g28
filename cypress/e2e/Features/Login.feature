Feature: Login

    Login as a user
    Scenario: Login With valid credentials
        Given I am on the login page
        When  I enter valid credentials
        Then I should be redirected to the dashboard page

    Scenario Outline: Login with invalid credentials
        Given I am on the login page
        When I enter "<user>" in the email field
        And I enter "<password>" in the password field
        And I click on the submit button
        Then I should see the message "<message>"
        Examples:
            | user      | password | message                                           |
            |           |          | Username or email is required                     |
            |           |          | Password is required                              |
            |           | 123      | Username or email is required                     |
            | employee1 |          | Password is required                              |
            | employee1 | 1234     | An error occurred during login. Please try again. |