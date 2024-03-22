describe("enter_and_update_info", () => {
  it("Should enter and save information with no issue", () => {
    cy.visit("/")
    cy.get('#email_add').type("someone@example.com")
    cy.get("#user_pass").type("somepassword")
    cy.get('#register_button').type('{enter}');
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })     
    cy.wait(500)
    cy.get('#f_name').clear().type("Jane")
    cy.get('#l_name').clear().type("Smith")
    cy.get('#p_number').clear().type("555 555 5555")
    cy.get('#s_address').clear().type("123 Blake Street")
    cy.get('#p_code').clear().type("H8H 3M4")
    cy.get('#s_prov').clear().type("Quebec")
    cy.get('#city').clear().type("Montreal")
    cy.get('#save_prof_btn').type('{enter}')

    cy.wait(10000)

  
  })
 })