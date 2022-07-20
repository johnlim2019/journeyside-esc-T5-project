/// <reference types="cypress" />

// import your function from .tsx file
import { getMapDetails } from '../../src/features/3_RoomDetails/RoomDetails';

describe('Unit Tests', () => {
  
  // Control test
  it('Control Test',() => {
    expect(true).to.eq(true);
  })
  
  // Function call
  it('Test Get Map Details with valid coordinates in selected hotel',() => {
    // SUTD Coordinates: 1.3414522580647132, 103.96334485260385
    const sutd = {
      longitude: 1.341,
      latitude: 103.963
    }

    const result = getMapDetails(sutd);

    expect(result[0]).to.eq(1.341);
    expect(result[1]).to.eq(103.963);
  })

  it('Test Get Map Details with null selected hotel',() => {
    expect(getMapDetails(null)[0]).to.eq(0);
    expect(getMapDetails(null)[1]).to.eq(0);
  })
})