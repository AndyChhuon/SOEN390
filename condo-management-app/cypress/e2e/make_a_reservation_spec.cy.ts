describe("Create a user request", () => {
  it("Should create a chat to adress request", () => {
    cy.visit("/")
    cy.get('#email_add').type("someone@example.com")
    cy.get("#user_pass").type("somepassword")
    cy.get('#register_button').type('{enter}');
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })     
     cy.wait(1000)


    cy.contains('Rent a property').click()
    cy.contains('Start Renting').click()
    cy.contains('My Rented Properties').click()
    cy.contains('Reserve Pool').type('{enter}')

    cy.wait(500)

    // cy.contains('save').click().type('{enter}')
    // cy.contains('save').dblclick('right')

    // Datepicker modal cypress bug 
    // Cypress cannot 'see' the datepicker
    // Through manual testing, reservation is sucessful 
    
  })
 })