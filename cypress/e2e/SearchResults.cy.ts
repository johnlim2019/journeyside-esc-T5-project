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
  })
  it.only('check if the search query are passed on correctly',()=>{
    cy.wait(3000)
    cy.get('div').contains('Destination').parent().within(() => {
      cy.get('input').should('have.value',"Singapore, Singapore")
    })    
    cy.get('div').contains('Dates').parent().within(() => {
      cy.get('input').should('have.value',"July 7, 2024 – July 8, 2024")
    })
    cy.get('div').contains('Adults').parent().within(() => {
      cy.get('select').should('have.value',2)
    })
    cy.get('div').contains('Kids').parent().within(() => {
      cy.get('select').should('have.value',2)
    })
    cy.get('div').contains('Rooms').parent().within(() => {
      cy.get('select').should('have.value',2)
    })
    // cy.pause()
    cy.get('.mantine-Grid-root.mantine-pafeaw').parent().within(() => {
      cy.get('Button').last().click()
    })
  })
  it('check results load success and use cache for repeated destination, ', () => {
    cy.get('.loaderSpinner').should('be.exist')
    cy.wait(1000)
    cy.get('.notification').contains("Singapore, Singapore")
    cy.get('.searchBtn').parent().within(() => {
      cy.get('Button').click();
    })
    cy.get('.loaderSpinner').should('not.exist');

  })
  it('change the search value', () => {
    cy.get('.Destination Input').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}Kuala Lumpur, Malaysia');
    })
    cy.get('.loaderSpinner').should('be.exist')
    cy.wait(1000)
    // cy.pause()
    cy.get('.notification').contains("Kuala Lumpur, Malaysia")
  })
  it('change category, page, items shown, refresh page and check success cache', () => {
    cy.get('div').contains("Show").first().parent().within(() => {
      cy.get('select').select('20 items')
    })
    cy.get('div').contains("Sort By:").parent().within(() => {
      cy.get('select').select('Price')
    })
    cy.get('.pagination').parent().within(() => {
      cy.get('button').contains("12").click()
    })
    cy.wait(1000); // wait for the cache to register 
    cy.reload()
    // assert that our page is the same 
    cy.get('div').contains("Show").first().parent().within(() => {
      cy.get('select').should('have.value', '20 items')
    })
    cy.get('div').contains("Sort By:").parent().within(() => {
      cy.get('select').should('have.value', 'Price')
    })
    cy.get('.pagination').parent().within(() => {
      cy.get('button').contains("12").should('have.css', 'background-color', 'rgb(34, 139, 230)')
    })
    // cy.pause()
  })
  it ('no search results show notification',() => {
    cy.get('.Destination Input').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}Seoul South Korea{enter}');
    })
    cy.get('.loaderSpinner').should('be.exist')
    cy.wait(1000)
    // cy.pause()
    cy.get('.notification').contains("We could not find results for Seoul, South Korea (GMP-Gimpo Intl.)")
  })
})
