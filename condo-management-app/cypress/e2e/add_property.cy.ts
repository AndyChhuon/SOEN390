describe("add property", () => {
  it("Should add a new property", () => {
    cy.visit("/")
    cy.get('#email_add').type("1someone@example.com")
    cy.get("#user_pass").type("somepassword")
    cy.get('#register_button').type('{enter}');
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })     
     cy.wait(1000)


    cy.contains('Property Profiles').click()
    cy.wait(500)
    cy.get('#add_button').type('{enter}');
    cy.wait(500)
    cy.get('#p_name').clear().type('ExampleProperty')
    cy.get('#u_count').clear().type('3')
    cy.get('#address').clear().type('123')
    cy.get('#p_count').clear().type('2')
    cy.get('#l_count').clear().type('0')
    cy.contains('Add Property').type('{enter}')
    cy.wait(500)
    
  })
 })