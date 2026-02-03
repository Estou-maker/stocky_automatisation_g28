import  {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
import EmployeeElements from    '../Page_Objects/AddnewemployeeObjects'

Given(`I navigate to Add employee page`, () => {
    // [Given] Sets up the initial state of the system.

    cy.get(EmployeeElements.EmployeeDashboardBTN).should('be.visible').click()
});

Then(`I should be able to add a new employee with valid details`, () => {
   
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(EmployeeElements.Create_employee_BTN).should('be.visible').click()
    cy.get(EmployeeElements.Create_employee_form, {timeout: 5000}).should('be.visible') 

    const prenom = `user_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7)}`

    cy.get(EmployeeElements.prenom_input).type(prenom)
});