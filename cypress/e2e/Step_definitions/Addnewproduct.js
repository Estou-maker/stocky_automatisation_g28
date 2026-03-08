import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import AddProductElements from '../Page_Objects/AddnewproductObjects';

beforeEach(()=> {
    cy.intercept('POST', 'https://stocky-backend-dev.uksouth.cloudapp.azure.com/api/v1/Product').as('AddnewProduct')
})

Given(`I navigate to Add Product page`, () => {
    cy.get(AddProductElements.btn_products_dashboard).should('be.visible').click()
    cy.wait(1000)
    cy.get(AddProductElements.Btn_add_new_product).should('be.visible').click()
    // [Given] Sets up the initial state of the system.
});

Then(`I should be able to add a new product with valid details`, () => {
    const carBrands = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Opel']
    const titre = `Titre_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7)}`
    const description = `Description_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 200)}`
    const Reference = `Ref_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 4)}`
    const Marque =  carBrands[Math.floor(Math.random()* carBrands.length)]
    const price = (Math.random() * 1000).toFixed(2)
    const TVA = (Math.random()* 100).toFixed(2)
    
    let unitTypeValue
    let CategorytypeValue
    let CurrencyTypeValue


    cy.get(AddProductElements.Block_add_new_product).should('be.visible')
    cy.get(AddProductElements.Input_product_title).type(titre)
    cy.get(AddProductElements.Input_product_description).type(description)
    cy.get(AddProductElements.Input_product_reference).type(Reference)
    cy.get(AddProductElements.input_product_marque).type(Marque)



    cy.get(AddProductElements.Select_product_categorie_trigger).click()
    cy.get(AddProductElements.Select_product_categorie_list).find('li').then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        CategorytypeValue = options[randomindex].innerText
        cy.wrap(options[randomindex]).click()
    })

    cy.get(AddProductElements.Select_product_unit_trigger).click()
    cy.get(AddProductElements.Select_product_unit_list).find('li').then(options=> {
        const randomindex = Math.floor(Math.random() * options.length)
        unitTypeValue = options[randomindex].innerText
        cy.wrap(options[randomindex]).click()
    })

    cy.get(AddProductElements.Input_product_price).clear().type(price)

    cy.get(AddProductElements.Select_product_currency_trigger).click()
    cy.get(AddProductElements.Select_product_currency_list).find('li').then(options=> {
        const randomindex = Math.floor(Math.random() * options.length)
        CurrencyTypeValue = options[randomindex].innerText
        cy.wrap(options[randomindex]).click()
    })
    
    cy.get(AddProductElements.Input_Product_TVA).clear().type(TVA)
    cy.get(AddProductElements.Btn_submit_product_add).should('be.visible').click()

    cy.wait('@AddnewProduct').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)
        expect(interception.response.body).to.have.property('title').and.to.eq(titre)
        expect(interception.response.body).to.have.property('description').and.to.eq(description)
        expect(interception.response.body).to.have.property('ref').and.to.eq(Reference)
        expect(interception.response.body).to.have.property('brand').and.to.eq(Marque)
        expect(interception.response.body).to.have.property('tva')
        expect(interception.response.body).to.have.property('price')
    })
});