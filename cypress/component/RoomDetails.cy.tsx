/// <reference types="cypress" />

// import your function from .tsx file
import RoomDetails from '../../src/features/3_RoomDetails/RoomDetails';
import { getMapDetails } from '../../src/features/3_RoomDetails/RoomDetails';
import { mount } from 'cypress/react'
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../src/services/hooks';
import { compileHotelData, selectHotelId } from '../../src/services/SearchBarSlice';
import { compileRoomData } from '../../src/services/RoomDetailSlice';
import mock_hotel from './mock_hotel.json';
import mock_hotelprice from './mock_hotelprice.json';
import mock_rooms from './mock_rooms.json';
import { Provider } from 'react-redux';
import { store } from '../../src/services/store';

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

function select(state) {
  return state.SearchBarReducer;
}

function handleChange(){
  cy.log(JSON.stringify(select(store.getState())));
}

describe('System Tests', () => {
  before(() => {
    store.subscribe(handleChange);
    store.dispatch(compileHotelData({hotels: mock_hotel, prices: mock_hotelprice, id: ""}));
    cy.wait(1000)
    // store.dispatch(selectHotelId({ id: "050G" }));
    // store.dispatch(compileRoomData({ data : mock_rooms }));
    // cy.window().its('store').invoke('dispatch', compileHotelData({hotels: mock_hotel, prices: mock_hotelprice, id: ""}))
  });

  it('State Test',() => {
    handleChange()
  })
  
  // Control test
  it('Mounting Test',() => {
    mount( 
      <Provider store={store}>
        <RoomDetails />
      </Provider>
    );
  })
})