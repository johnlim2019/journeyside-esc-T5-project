/// <reference types="cypress" />
describe('NavBarCheck', () => {
  const BASE = 'http://localhost:3000/'
  const SEARCHRESULT = "SearchResults"
  const USER = "UserProfile"
  beforeEach(() => {
    cy.visit(BASE);
    cy.viewport(1920, 1080)
  })
  it('check if desktop navbar renders ', () => {
    cy.get('.FullNavBar').should('be.exist')
    cy.get('.NarrowNavBar').should('not.exist')

  })
  it('check home and search results buttons', () => {
    // this gets the nested element with the tag containing innerhtml specified
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Search Results').click()
    })
    cy.url().should('eq', BASE + SEARCHRESULT)
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Home').click()
    })
    cy.url().should('eq', BASE)
  })
  it('login and check ', () => {
    // cy.pause() // this allows us to go step by step though the test.
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log in').click()
    })
    // cy.pause()
    cy.get('.LogInModal').parent().within(() => {
      cy.get('Button').contains('Log In').click()
    })
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('User Profile').should('be.exist')
    })
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').get('Button').contains('Log Out').should('be.exist')
    })
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').get('Button').contains('User Profile').click()
    }).then(()=>{
      cy.url().should('eq', BASE + USER)
    })
    // complete log in test, log out
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log Out').click()
    })
  })
  it('check UserProfile does not exist when not logged in', () => {    
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('User Profile').should('not.exist')
    })  })

})