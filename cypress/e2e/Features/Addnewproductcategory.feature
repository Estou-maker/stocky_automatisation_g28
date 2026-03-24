Feature: Add new product Category

    Background:
        Given I am on the login page
        When  I enter valid credentials
        Then I should be redirected to the dashboard page
    
    Scenario: Add a new product Category 
        Given I navigate to Add Produc Category page
        Then I should be able to add a new product Category with valid details