/// <reference types="cypress" />

function generateIllegalnames(illegal){
  
}



describe('fuzzy booking  spec', () => {
  const BASE = 'http://localhost:3000/'
  const SEARCHRESULT = "SearchResults"
  const USER = "UserProfile"
  const BOOKING = "BookingData"
  const LOCATION = "Singapore, Singapore"
  before(() => {
    cy.visit(BASE)
    cy.get('input').first().focus().type(LOCATION)
    cy.get('.mantine-DateRangePicker-wrapper.mantine-12sbrde').parent().within(() => {
      cy.get('input').click()
    })
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-calendarHeaderLevel.mantine-1xk0qjw').click()
    cy.get('button').contains('Dec').click()
    cy.get('button').contains('17').click()
    cy.get('button').contains('18').click()
    cy.get('div').contains('Adults').parent().within(() => {
      cy.get('select').select(2)
    })
    cy.get('div').contains('Kids').parent().within(() => {
      cy.get('select').select(2)
    })
    cy.get('div').contains('Rooms').parent().within(() => {
      cy.get('select').select(1)
    })
    cy.wait(1000)
    cy.get('.mantine-Grid-root.mantine-pafeaw').parent().within(() => {
      cy.get('Button').last().click()
    })
    cy.wait(4000)
    cy.get('.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').last().click()
    cy.wait(4000)
    cy.get('a[href="/BookingData"]').first().click()  
  })
  it("inputs that are too long ",()=>{

  })
})