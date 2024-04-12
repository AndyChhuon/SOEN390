describe("update fees of property", () => {
  it("Should update fees of existing property", () => {
    cy.visit("/")
    cy.get('#email_add').type("someone@example.com")
    cy.get("#user_pass").type("somepassword")
    cy.get('#register_button').type('{enter}');
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })     
     cy.wait(1000)


    cy.contains('Property Profiles').click()
    cy.wait(500)
    cy.contains('Financial').type('{enter}');
    cy.wait(500)
    cy.get('#fees_per_square_foot').clear().type('2')
    cy.get('#fee_per_parking_spot').clear().type('150')
    cy.contains('Update Fees').type('{enter}');
    cy.wait(500)
    
  })
 })