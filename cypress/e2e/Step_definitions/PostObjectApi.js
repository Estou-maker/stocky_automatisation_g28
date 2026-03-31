import  {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

Given(`I have the Api Endpoint {string}`, (arg0) => {
    // [Given] Sets up the initial state of the system.
    cy.log('Sending Post Request to the api endpoing')

});

When(`I send A POST request to the API Endpoint it should be valid`, () => {

    const dateauj =     new Date()
    const randomPrice = +(Math.random() * 2000 + 500).toFixed(2)
    const randomYear = 2020 + Math.floor(Math.random() * 10)
    const randomDisk = Math.floor(Math.random() * 10 + 1)
    const productName = `Test Product Automation ${dateauj}`


    cy.request('POST', 'https://api.restful-api.dev/objects',{
        "name": productName,
    "data": {
        "year": randomYear,
        "price": randomPrice,
        "CPU model": `Intel Core i9 auto ${dateauj}`,
        "Hard disk size": `${randomDisk}TB auto`}

    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('data').and.to.have.property('year', randomYear)
        expect(response.body).to.have.property('data').and.to.have.property('price', randomPrice)
        expect(response.body).to.have.property('data').and.to.have.property('CPU model', `Intel Core i9 auto ${dateauj}`)
        cy.log('Response.body:', JSON.stringify(response.body, null, 2))
        cy.log(`Created Object ID: ${response.body.id}`)
})
});
Then(`I verify the response contains the created object details`, () => {
    cy.log('Response verification completed')
});


