Feature: Add new product

    Background:
        Given I am on the login page
        When  I enter valid credentials
        Then I should be redirected to the dashboard page
    
    Scenario: Add a new product 
        Given I navigate to Add Product page
        Then I should be able to add a new product with valid details