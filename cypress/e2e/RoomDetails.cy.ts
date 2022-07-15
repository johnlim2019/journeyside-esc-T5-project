/// <reference types="cypress" />

// import your function from .tsx file
import { getMapDetails } from '../../src/features/3_RoomDetails/RoomDetails';

describe('Unit Test Feature 3', () => {
  
  // Sample test
  it('Check Test',() => {
    expect(true).to.eq(true);
  })
  
  // Call your function
  it('Test Get Map Details',() => {
    expect(getMapDetails(null)[0]).to.eq(0);
    expect(getMapDetails(null)[1]).to.eq(0);
  })
})