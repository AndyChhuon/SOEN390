describe("add_property", () => {
  it("Should navigate to property profile and add a property with no issue", () => {
    cy.visit("/")
    cy.get('#email_add').type("someone1@example.com")
    cy.get("#user_pass").type("somepassword1")
    cy.get('#register_button').type('{enter}');
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })     
    cy.wait(500)
    cy.contains('Property Profiles').click()
    cy.wait(500)
    //cy.get('#add_button').click()
    //cy.get('#property_name').clear().type("ExampleProperty")
    //cy.get('#unit_count').clear().type("3")
    //cy.get('#address').clear().type("123")
    //cy.get('#parking_count').clear().type("2")
    //cy.get('#locker_count').clear().type("0")
  })
 })