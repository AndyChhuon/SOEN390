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


    cy.contains('Make a Request').click()
    cy.get('select').select(1)
    cy.get('#request_msg').type("I have a leaky faucet. I need to get it repaired.")
    cy.get('#send_btn').click()
    cy.wait(2000)
    cy.get('#chat_msg_space').type('My unit number is 123 and my phone number is 555 555 5555')
    cy.get('#chat_send_btn').click()
    cy.wait(2000)
    cy.get('#chat_msg_space').type('Tomorrow 9 am')
    cy.get('#chat_send_btn').click()
    cy.wait(3000)
    cy.get('#end_chat_btn').click()
    
  })
 })