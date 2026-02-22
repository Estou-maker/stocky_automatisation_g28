Feature: Test Api Get

    To test the api endpoints

Scenario: Send Get request to the Api
    Given I have the Api Endpoint "https://api.restful-api.dev/objects"
    When I send a get request to the api endpoint the response should be 200