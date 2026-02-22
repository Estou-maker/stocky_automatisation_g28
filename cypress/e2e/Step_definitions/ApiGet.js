import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given(`I have the Api Endpoint {string}`, (arg0) => {
    cy.log('setting up the api endpoint')
    // [Given] Sets up the initial state of the system.
});

When(`I send a get request to the api endpoint the response should be {int}`, (arg0) => {

    // [When] Describes the action or event that triggers the scenario.
    cy.log('sending Get request to the api endpoint...')
    cy.request({
        methode: 'GET',
        url: 'https://csscolorsapi.com/api/colors',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            
        }
    }).then((response)=>{
        expect(response.status).to.eq(arg0)
        expect(response.body).to.not.be.empty
        

        const colors = response.body.map (item => item.data?.color || item.data?.Color || item.data?.['Strap Colour'])
            .filter(Boolean)
        
        cy.log('Extracted Colors:', colors)
        colors.forEach((color, index) => {
            cy.log(`Color ${index + 1}: ${color}`)
        })
        
    })
});