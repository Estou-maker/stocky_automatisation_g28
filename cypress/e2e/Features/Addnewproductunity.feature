Feature: Add new product unity

    Background:
        Given I am on the login page
        When  I enter valid credentials
        Then I should be redirected to the dashboard page
    
    Scenario: Add a new product unity 
        Given I navigate to Add Produc unity page
        Then I should be able to add a new product unity with valid details