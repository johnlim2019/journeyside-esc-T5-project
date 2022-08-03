/// <reference types="cypress" />
describe('BookingData', () => {
  const BASE = 'http://localhost:3000/'
  const SEARCHRESULT = "SearchResults"
  const USER = "UserProfile"
  const BOOKING = "BookingData"
  const LOCATION = "Singapore, Singapore"
  before(() => {
    cy.reload(true);
    cy.visit(BASE)
    // log out
    // cy.get('.FullNavBar').parent().within(() => {
    //   cy.get('Button').contains('Log Out').click()
    // })

    cy.wait(1000)
    cy.get('input').first().focus().type('{selectAll}{backspace}' + LOCATION)
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
  })
  it('check if the search query are passed on correctly', () => {
    cy.wait(4000)
    cy.get('div').contains('Destination').parent().within(() => {
      cy.get('input').should('have.value', "Singapore, Singapore")
    })
    cy.get('div').contains('Dates').parent().within(() => {
      cy.get('input').should('have.value', "December 17, 2022 – December 18, 2022")
    })
    cy.get('div').contains('Adults').parent().within(() => {
      cy.get('select').should('have.value', 2)
    })
    cy.get('div').contains('Kids').parent().within(() => {
      cy.get('select').should('have.value', 2)
    })
    cy.get('div').contains('Rooms').parent().within(() => {
      cy.get('select').should('have.value', 2)
    })
    cy.get('.notification').contains("Singapore, Singapore")
    cy.get('div').contains('The Ritz-Carlton, Millenia Singapore')
    cy.get('div').contains('Shangri-La Hotel Singapore')
    cy.get('div').contains('AMOY')
    cy.get('div').contains('The Fullerton Hotel Singapore')
    cy.get('div').contains('Fairmont Singapore')
    cy.get('div').contains('The St. Regis Singapore')
    cy.get('div').contains('The Westin Singapore')
  })
  it('check results load success and use cache for repeated search query on first page ', () => {
    
    cy.get('.loaderSpinner').should('not.exist');
    cy.get('.notification').contains("Singapore, Singapore")
    cy.get('div').contains('The Ritz-Carlton, Millenia Singapore')
    cy.get('div').contains('Shangri-La Hotel Singapore')
    cy.get('div').contains('AMOY')
    cy.get('div').contains('The Fullerton Hotel Singapore')
    cy.get('div').contains('Fairmont Singapore')
    cy.get('div').contains('The St. Regis Singapore')
    cy.get('div').contains('The Westin Singapore')
  })
  it('change the search value', () => {
    cy.get('.pagination').parent().within(() => {
      cy.get('button').contains("2").click()
    })
    cy.get('.DestinationInput').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}Kuala Lumpur, Malaysia');
    })    
    cy.get('.loaderSpinner').should('be.exist')
    cy.wait(4000)
    // cy.pause()
    // check for the page reset to 1 
    cy.get('.notification').contains("Kuala Lumpur, Malaysia")
    cy.get('.notification').contains("1 to 10")
  })
  it('change the date value', () => {
    cy.get('.pagination').parent().within(() => {
      cy.get('button').contains("2").click()
    })
    cy.get('input[name="date"]').click()
    cy.wait(4000)
    cy.get(".mantine-Paper-root.mantine-DateRangePicker-dropdown.mantine-mrt426").parent().within(()=>{
      cy.get('button').contains('12').click({force:true})
      cy.get('button').contains('18').click()
    })
    cy.get('.loaderSpinner').should('be.exist')
    cy.wait(4000)
    // cy.pause()
    // check for the page reset to 1 
    cy.get('.notification').contains("Kuala Lumpur, Malaysia")
    cy.get('.notification').contains("1 to 10")
  })
  it('change category, page, items shown, refresh page and check success cache', () => {
    cy.get('div').contains("Show per page").first().parent().within(() => {
      cy.get('select').select('20 items')
    })
    cy.get('div').contains("Sort By:").parent().within(() => {
      cy.get('select').select('Price')
    })
    cy.wait(3000)
    cy.get('.pagination').parent().within(() => {
      cy.get('button').contains("2").click()
    })
    cy.wait(1000); // wait for the cache to register 
    cy.reload()
    // assert that our page is the same 
    cy.get('div').contains("Show per page").first().parent().within(() => {
      cy.get('select').should('have.value', '20 items')
    })
    cy.get('div').contains("Sort By:").parent().within(() => {
      cy.get('select').should('have.value', 'Price')
    })
    cy.get('.pagination').parent().within(() => {
      cy.get('button').contains("2").should('have.css', 'background-color', 'rgb(34, 139, 230)')
    })
  })
  it('no search results show notification', () => {
    cy.get('.DestinationInput').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}not real{enter}');
    })
    cy.get('.loaderSpinner').should('be.exist')
    cy.wait(4000)
    // cy.pause()
    cy.get('div').contains('We could not find results for "not real place"')
  })
})
