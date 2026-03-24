import  {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

Given(`I have the Api Endpoint {string}`, (arg0) => {
    // [Given] Sets up the initial state of the system.
    cy.log('Sending Post Request to the api endpoing')

});

When(`I send A POST request to the API Endpoint it should be valid`, () => {

    cy.request('POST', 'https://api.restful-api.dev/objects',{
        "name": "Test Product Automation",
    "data": {
        "year": 2026,
        "price": 1849.99,
        "CPU model": "Intel Core i9 auto",
        "Hard disk size": "5 TB auto"}
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name', 'Test Product Automation')
        cy.log('Response.body:', JSON.stringify(response.body, null, 2))
        cy.log(`Created Object ID: ${response.body.id}`)
})
});