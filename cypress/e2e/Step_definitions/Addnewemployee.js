import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import EmployeeElements from '../Page_Objects/AddnewemployeeObjects'

Given(`I navigate to Add employee page`, () => {
    // [Given] Sets up the initial state of the system.

    cy.get(EmployeeElements.EmployeeDashboardBTN).should('be.visible').click()
});

Then(`I should be able to add a new employee with valid details`, () => {

    const jobTitles = [
        "Software Engineer",
        "Product Manager",
        "Data Scientist",
        "UX Designer",
        "Marketing Manager",
        "Sales Representative",
        "DevOps Engineer",
        "Business Analyst",
        "Customer Success Manager",
        "HR Specialist"];

    const prenom = `Prenom_auto_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7)}`
    const nom = `Nom_auto_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7)}`
    const email = `email_auto_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7)}@test.com`
    const username = `user_auto_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7)}`
    const countrycode = `216`
    const phonenumber = Math.floor(10000000 + Math.random() * 90000000)
    const Jobtitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];



    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(EmployeeElements.Create_employee_BTN).should('be.visible').click()
    cy.get(EmployeeElements.Create_employee_form, { timeout: 5000 }).should('be.visible')
    cy.get(EmployeeElements.prenom_input).type(prenom)
    cy.get(EmployeeElements.nom_input).type(nom)
    cy.get(EmployeeElements.email_input).type(email)
    cy.get(EmployeeElements.username_input).type(username)
    cy.get(EmployeeElements.country_code_input).type(countrycode)
    cy.get(EmployeeElements.phone_number_input).type(phonenumber)
    cy.get(EmployeeElements.job_title_input).type(Jobtitle)

    let EmploymentCategoryValue
    let ContractTypeValue

    cy.get(EmployeeElements.Select_employment_category_trigger).click()
    cy.get(EmployeeElements.Categories_listbox).find('li').then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        EmploymentCategoryValue = options[randomindex].innerText
        cy.wrap(options[randomindex]).click()
    })


    cy.get(EmployeeElements.Select_contract_type_trigger).click()
    cy.get(EmployeeElements.contract_type_list).find('li').then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        ContractTypeValue = options[randomindex].innerText
        cy.wrap(options[randomindex]).click()

    })


    cy.get(EmployeeElements.btn_submit_btn).should('be.visible').click()


    cy.get(EmployeeElements.New_Employee_profile).should('be.visible').should('contain', nom)
    cy.get(EmployeeElements.New_Employee_profile).should('contain', prenom,)
    cy.get(EmployeeElements.New_Employee_profile).should('contain', email,)
    cy.get(EmployeeElements.New_Employee_profile).should('contain', username,)
    cy.get(EmployeeElements.New_Employee_profile).should('contain', phonenumber,)
    cy.get(EmployeeElements.New_Employee_profile).should('contain', Jobtitle)

});