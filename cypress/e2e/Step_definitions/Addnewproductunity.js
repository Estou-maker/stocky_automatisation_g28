import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import AddProductunityElements from '../Page_Objects/AddnewunityObjects'

beforeEach(()=> {
    cy.intercept('POST', 'https://stocky-backend-dev.uksouth.cloudapp.azure.com/api/v1/ProductUnit').as('AddnewProductunity')
})



Given(`I navigate to Add Produc unity page`, () => {
    // [Given] Sets up the initial state of the system.
    cy.get(AddProductunityElements.Productunity_BTN).should('be.visible').click()
    cy.screenshot()
});

Then(`I should be able to add a new product unity with valid details`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
    const Punity = `PunitAuto_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5)}`
    const description = `Description_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 200)}`
    cy.wait(2000)
    cy.get(AddProductunityElements.BTN_creer_nouvelle_unite).should('be.visible').click()
    cy.get(AddProductunityElements.Add_newunite_form).should('be.visible')

    cy.get(AddProductunityElements.Title_input).type(Punity)

    cy.get(AddProductunityElements.DescriptionInput).type(description)

    cy.get(AddProductunityElements.BTN_submit).click() 



    cy.wait('@AddnewProductunity').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)
        expect(interception.response.body).to.have.property('unit').and.to.eq(Punity)
        expect(interception.response.body).to.have.property('description').and.to.eq(description)
    })
});

