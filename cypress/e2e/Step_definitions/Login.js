import  {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
import loginElements from '../Page_Objects/login_Objects';


Given(`I am on the login page`, () => {
    // [Given] Sets up the initial state of the system.
    cy.visit(loginElements.loginURL)
    cy.get(loginElements.TitleCNX).should('be.visible').and('contain', ' Welcome Back ')
});

When(`I enter valid credentials`, () => {
    cy.log("Entering Valid Credentials...")
    // [When] Describes the action or event that triggers the scenario.
    cy.get(loginElements.EmailInput).invoke('attr', 'type', 'email').should('be.visible').type(Cypress.env('USER_EMAIL'), { log: false})
    cy.get(loginElements.PasswordInput).invoke('attr', 'type', 'password').should('be.visible').type(Cypress.env('USER_PASSWORD'), { log: false})
    cy.get(loginElements.submitBtn).should('be.visible').and('not.be.disabled').click()
});

Then(`I should be redirected to the dashboard page`, () => {
    cy.log("test")
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(loginElements.DashboardContainer).should('be.visible').and('contain', 'Employee Dashboard')
    cy.screenshot()
});

When(`I enter {string} in the email field`, (user) => {
    // [When] Describes the action or event that triggers the scenario.
    if (user) {
        cy.get(loginElements.EmailInput).type(user)
    } else {
        cy.get(loginElements.EmailInput).clear()
    }
});

When(`I enter {string} in the password field`, (password) => {
    // [When] Describes the action or event that triggers the scenario.
    if (password) {
        cy.get(loginElements.PasswordInput).type(password)
    } else {
        cy.get(loginElements.PasswordInput).clear()
    }
});



When(`I click on the submit button`, () => {
    cy.get(loginElements.submitBtn).should('be.visible').click()
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see the message {string}`, (message) => {
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(loginElements.ErrorMessage).should('be.visible').and('contain', message)
});