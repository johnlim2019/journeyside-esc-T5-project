describe('NavBarCheck', () => {
  const BASE = 'http://localhost:3000/'
  const SEARCHRESULT = "SearchResults"
  const USER = "UserProfile"
  beforeEach(() => {
    cy.visit(BASE);
    cy.viewport('samsung-s10')
  })
  it('check if desktop navbar renders ', () => {
    cy.get('.NarrowNavBar').should('be.exist')
    cy.get('.FullNavBar').should('not.exist')

  })
  it('check home and search results buttons', () => {
    // cy.pause() // this allows us to go step by step though the test.
    // this gets the nested element with the tag containing innerhtml specified
    cy.get('.NarrowNavBar').parent().within(() => {
      cy.get('#Burger').click()
    })
    cy.get('.NavBarDrawer').parent().within(() => {
      cy.get('Button').contains('Search Results').click()
    })
    cy.url().should('eq', BASE + SEARCHRESULT)
    cy.get('.NarrowNavBar').parent().within(() => {
      cy.get('#Burger').click()
    })
    cy.get('.NavBarDrawer').parent().within(() => {
      cy.get('Button').contains('Home').click()
    })
    cy.url().should('eq', BASE)
  })
  it('login and check ', () => {
    cy.get('.NarrowNavBar').parent().within(() => {
      cy.get('#Burger').click()
    })
    cy.get('.NavBarDrawer').parent().within(() => {
      cy.get('Button').contains('Log in').click()
    })
    cy.get('.LogInModal').parent().within(() => {
      cy.get('Button').contains('Log In').click()
    })
    cy.get('.NavBarDrawer').parent().within(() => {
      cy.get('Button').contains('User Profile').should('be.exist')
    })
    cy.get('.NavBarDrawer').parent().within(() => {
      cy.get('Button').get('Button').contains('Log Out').should('be.exist')
    })    
    cy.pause()
    cy.get('.NavBarDrawer').parent().within(() => {
      cy.get('Button').get('Button').contains('User Profile').click()
    }).then(() => {
      cy.url().should('eq', BASE + USER)
    })
    cy.get('.NarrowNavBar').parent().within(() => {
      cy.get('#Burger').click()
    })
    // complete log in test, log out
    cy.get('.NavBarDrawer').parent().within(() => {
      cy.get('Button').contains('Log Out').click()
    })
  })
  it('check UserProfile does not exist when not logged in', () => {
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('User Profile').should('not.exist')
    })
  })

})