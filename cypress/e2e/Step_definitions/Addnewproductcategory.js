import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import AddProductCatgoryElements from '../Page_Objects/AddnewproductcategoryObjects';

beforeEach(()=> {
    cy.intercept('POST', 'https://stocky-backend-dev.uksouth.cloudapp.azure.com/api/v1/ProductCategory').as('AddnewProductCategory')
})



Given(`I navigate to Add Produc Category page`, () => {
    // [Given] Sets up the initial state of the system.
    cy.get(AddProductCatgoryElements.ProductCategory_BTN).should('be.visible').click()
    cy.screenshot()
});

Then(`I should be able to add a new product Category with valid details`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
    const PCategory = `PCatAuto_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5)}`
    const description = `Description_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 200)}`

    cy.get(AddProductCatgoryElements.BTN_creer_nouvelle_Category).should('be.visible').click()
    cy.get(AddProductCatgoryElements.Add_newCategory_form).should('be.visible')

    cy.get(AddProductCatgoryElements.Title_input).type(PCategory)

    cy.get(AddProductCatgoryElements.DescriptionInput).type(description)

    cy.get(AddProductCatgoryElements.BTN_submit).click() 



    cy.wait('@AddnewProductCategory').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)
        expect(interception.response.body).to.have.property('title').and.to.eq(PCategory)
        expect(interception.response.body).to.have.property('description').and.to.eq(description)
    })
});