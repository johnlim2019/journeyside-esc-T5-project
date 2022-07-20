// import your function from .tsx file
//import { SearchBar } from '../../src/features/2_SearchResults/SearchBar';
//import { validateQuery, setErrorMessages, getDestDetails, getDefaultDates, getMinDate} from '../../src/features/2_SearchResults/SearchBar';
describe('Feature 1 E2E Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/SearchResults')
  })
  it('Search Button Click Test',() => {
    cy.get('.SearchButton').click()
    
  })
  it('Autocomplete Test',()=>{
    const $input = cy.pause().get('.destinationInput').within(()=>{cy.get('input').focus().clear().type('Singapore')})
    $input.type('{downarrow}')
    $input.type('{enter}')
    cy.get('.destinationInput').get('input').should("contain.value", "Singapore, Singapore")
    cy.get('.SearchButton').children().click()
  })
  it('Invalid Entry Test',()=>{
    cy.pause().get('.destinationInput').within(()=>{cy.get('input').focus().clear().type('Peekaboobooboo')})
    cy.get(".Autocomplete").contains('Invalid Destination')
    cy.get('.SearchButton').children().click()
  })

})