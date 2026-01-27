var { Given, When, Then, DataTable } = require('@badeball/cypress-cucumber-preprocessor');

Given(`I am on the login page`, () => {
    // [Given] Sets up the initial state of the system.
});

When(`I enter valid credentials`, () => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should be redirected to the dashboard page`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`I enter {string} in the email field`, (arg0) => {
    // [When] Describes the action or event that triggers the scenario.
});

When(`I enter {string} in the password field`, (arg0) => {
    // [When] Describes the action or event that triggers the scenario.
});

When(`I click on the submit button`, () => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see the message {string}`, (arg0) => {
    // [Then] Describes the expected outcome or result of the scenario.
});