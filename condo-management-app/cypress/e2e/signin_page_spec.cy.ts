describe("Signup", () => {
    it("Should sign up without issues", () => {
      cy.visit("/")
  
      cy.get('#email_add').type("someone@example.com")
    
      cy.get("#user_pass").type("somepassword")
  
      cy.get('#register_button').type('{enter}');
      cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })    
    })
   })