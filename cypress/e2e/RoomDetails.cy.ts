/// <reference types="cypress" />

import { getMapDetails } from '../../src/features/3_RoomDetails/RoomDetails';

// describe('My First Test', () => {
//   it('Launch webpage', () => {
//     cy.visit('http://localhost:3000/');
//   })
// })

describe('Unit Test Feature 3', () => {
  it('Check Test',() => {
    expect(true).to.eq(true);
  })
  
  it('Test Get Map Details',() => {
    expect(getMapDetails(null)[0]).to.eq(0);
    expect(getMapDetails(null)[1]).to.eq(0);
  })
})