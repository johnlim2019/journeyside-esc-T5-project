/// <reference types="cypress" />
// import your function from .tsx file
//import { SearchBar } from '../../src/features/2_SearchResults/SearchBar';
//import { validateQuery, setErrorMessages, getDestDetails, getDefaultDates, getMinDate} from '../../src/features/2_SearchResults/SearchBar';
describe('Feature 1 E2E Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/SearchResults')
  })
  it('Autocomplete Test',()=>{
    const $input = cy.get('.DestinationInput').within(()=>{cy.get('input').focus().clear().type('Singapore')})
    $input.type('{downarrow}')
    $input.type('{enter}')
    cy.get('.DestinationInput').get('input').should("contain.value", "Singapore, Singapore")
  })
  it('Invalid Entry Test',()=>{
    cy.reload(true)
    cy.get('.DestinationInput').within(()=>{cy.get('input').focus().clear().type('Peekaboobooboo')})
    cy.get(".Autocomplete").contains('Invalid Destination')
    // cy.get('.SearchButton').children().click()
    cy.get('.Date').within(()=>{
      cy.get('input').click()
      cy.get('button').first().click()
      cy.get('input').blur()
      cy.get('.dateInput').contains("Invalid Date");
    })
  })

})