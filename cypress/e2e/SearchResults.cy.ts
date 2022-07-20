/// <reference types="cypress" />
describe('BookingData', () => {
  const BASE = 'http://localhost:3000/'
  const SEARCHRESULT = "SearchResults"
  const USER = "UserProfile"
  const BOOKING = "BookingData"
  const LOCATION = "Singapore, Singapore"
  beforeEach(() => {
    cy.visit(BASE)
    // log out
    // cy.get('.FullNavBar').parent().within(() => {
    //   cy.get('Button').contains('Log Out').click()
    // })

    cy.wait(1000)
    cy.get('input').first().focus().type(LOCATION)
    cy.get('.mantine-DateRangePicker-wrapper.mantine-12sbrde').parent().within(() => {
      cy.get('input').click()
    })
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-calendarHeaderLevel.mantine-1xk0qjw').click()
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-calendarHeaderLevel.mantine-1xk0qjw').click()
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-yearPickerControl.mantine-v8o1j6').contains('2024').click()
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-monthPickerControl.mantine-13qbqe7').contains('Jul').click()
    cy.get('button').contains('7').click()    
    cy.get('button').contains('8').click()    
    // cy.pause()
    cy.get('.mantine-Grid-root.mantine-pafeaw').parent().within(() => {
      cy.get('Button').last().click()
    })
  })
  it('check results load success', () => {
    cy.get('.loaderSpinner').should('be.exist')
    cy.wait(4500)
    cy.get('.notification').contains("Singapore, Singapore")    
  })
})
