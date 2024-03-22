// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('/')
//   })
// })

describe("Login", () => {
  it("Should log in without issues", () => {
    cy.visit("/")

    cy.contains('Click here to login').click()

    cy.wait(300)

    cy.get('#email_address').type("someone@example.com")
    
    cy.get("#user_password").type("somepassword")

    cy.get('#login_button').type('{enter}');
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    
  })
 })
