/// <reference types="cypress" />

// import your function from .tsx file
import RoomDetails from '../../src/features/3_RoomDetails/RoomDetails';
import { getMapDetails } from '../../src/features/3_RoomDetails/RoomDetails';
import { mount } from 'cypress/react'
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../src/services/hooks';
import { compileHotelData } from '../../src/services/SearchBarSlice';
import mock_hotel from './mock_hotel.json';
import mock_hotelprice from './mock_hotelprice.json';

describe('Unit Tests', () => {
  
  // Control test
  it('Control Test',() => {
    expect(true).to.eq(true);
  })
  
  // Function call
  it('Test getMapDetails() with valid coordinates in selected hotel',() => {
    // SUTD Coordinates: 1.3414522580647132, 103.96334485260385
    const sutd = {
      longitude: 1.341,
      latitude: 103.963
    }

    const result = getMapDetails(sutd);

    expect(result[0]).to.eq(1.341);
    expect(result[1]).to.eq(103.963);
  })

  it('Test getMapDetails() with null selected hotel',() => {
    expect(getMapDetails(null)[0]).to.eq(0);
    expect(getMapDetails(null)[1]).to.eq(0);
  })
})

describe('System Tests', () => {

  const dispatch = useAppDispatch();

  before(() => {
    dispatch(compileHotelData({ hotels: mock_hotel, prices: mock_hotelprice, id: "050G" }));
  });
  
  // Control test
  it('Mounting Test',() => {
    mount( <RoomDetails /> );
  })
})