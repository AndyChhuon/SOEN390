describe("Create a cost and generate report", () => {
  it("Should create a cost and then report can be generated", () => {
    cy.visit("/")
    cy.get('#email_add').type("someone@example.com")
    cy.get("#user_pass").type("somepassword")
    cy.get('#register_button').type('{enter}');
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })     
     cy.wait(1000)

    cy.contains('Property Profiles').click()
    cy.contains('Financials').type('{enter}');
    cy.wait(1000)
    cy.get('#tenant_id').type("abc12390")
    cy.get("#cost_desc_id").type("Repair sink")
    cy.get('#cost_ammount_id').type("95.00")
    cy.wait(500)
    cy.contains('Add Cost Entry').type('{enter}');
    cy.contains('Generate Report').type('{enter}');
    //with help of manual testing, we can check report contents
  })
})