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
        url: 'https://dogapi.dog/api/v2/breeds',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            
        }
    }).then((response)=>{
        expect(response.status).to.eq(arg0)
        expect(response.body).to.not.be.empty
        expect(response.body).to.have.property('data')
        expect(response.body.data).to.be.an('array').and.have.length.greaterThan(0)

        expect(response.body).to.have.property('meta')
        expect(response.body.meta.pagination.current).to.eq(1)
        expect(response.body.meta.pagination.records).to.eq(283)

        expect(response.body).to.have.property('links')
        expect(response.body.links.self).to.contain('/breeds')
        expect(response.body.links.current).to.contain('page[number]=1')

        // validation du premier élément

        const first = response.body.data[0]
        expect(first).to.have.property('id')
        expect(first.type).to.eq('breed')

        expect(first.attributes).to.have.property('name', 'Affenpinscher')
        expect(first.attributes).to.have.property('description')
        expect(first.attributes.description).to.contain('The Affenpinscher is a small and playful breed of dog that was originally bred in Germany for hunting small game. They are intelligent, energetic, and affectionate, and make excellent companion dogs.')
        expect(first.attributes.life.min).to.eq(14)
        expect(first.attributes.life.max).to.eq(16)
        expect(first.attributes.male_weight.max).to.eq(5)
        expect(first.attributes.male_weight.min).to.eq(3)
        expect(first.attributes.female_weight.max).to.eq(5)
        expect(first.attributes.female_weight.min).to.eq(3)

        expect(first.attributes.hypoallergenic).to.be.true

        // validé second item

        const second = response.body.data[1]
        expect(second.attributes.name).to.eq('Afghan Hound')
        expect(second.attributes.description).to.eq('The Afghan Hound is a large and elegant breed of dog that was originally bred in Afghanistan for hunting small game. They are intelligent, independent, and athletic, and make excellent companion dogs.')
        expect(second.attributes.hypoallergenic).to.be.false

        expect(second.attributes.life.max).to.eq(14)
        expect(second.attributes.life.min).to.eq(12)

        expect(second.attributes.male_weight.max).to.eq(27)
        expect(second.attributes.male_weight.min).to.eq(23)

        expect(second.attributes.female_weight.max).to.eq(25)
        expect(second.attributes.female_weight.min).to.eq(20)


    })
});