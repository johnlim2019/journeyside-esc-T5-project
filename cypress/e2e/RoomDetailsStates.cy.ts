/// <reference types="cypress" />
import { store } from '../../src/services/store';

const BASE = 'http://localhost:3000/';
const LOCATION = "Singapore, Singapore";

let numberOfHotels = 0;

before(() => {
    cy.visit(BASE);
    cy.get('input').first().focus().type(LOCATION)
    cy.get('.mantine-DateRangePicker-wrapper.mantine-12sbrde').parent().within(() => {
        cy.get('input').click()
    })
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-calendarHeaderLevel.mantine-1xk0qjw').click()
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-calendarHeaderLevel.mantine-1xk0qjw').click()
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-yearPickerControl.mantine-v8o1j6').contains('2024').click()
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-monthPickerControl.mantine-13qbqe7').contains('Jul').click()
    cy.get('button').contains('7').click()    
    cy.get('button').contains('8').click()    
    cy.get('.mantine-Grid-root.mantine-pafeaw').parent().within(() => {
        cy.get('Button').last().click()
    })

    // Hotel Search loaded
    cy.wait(3000)

    cy.get('.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').then(($el) => {
        numberOfHotels = $el.length;
        cy.log("Number of hotels: "+numberOfHotels);
    })
})

describe('Room Details System Test', () => {
    let selectedHotel:any = null;
    let hotelRooms:any = null;
    let numberOfRooms = 0;

    before(() => {
        // poll up to three times
        for(let i = 0; i < 3; i++){
            cy.get('.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').last().click()
            // Room Details Page Loaded
    
            cy.wait(4500)
            selectedHotel = store.getState().SearchBarReducer.selectHotelObj;
            if(selectedHotel != null){
                break;
            }
            cy.go('back');
        }
        cy.log(JSON.stringify(selectedHotel));
    });


    it('Selected Hotel State Check', () => {
        expect(selectedHotel).to.not.equal(null);
    })

    it('Hotel name displayed', () => {
        cy.get('h2').first().should('have.text', selectedHotel.name);
    })

    it('Hotel address and coordinates displayed', () => {
        cy.get('#hotel-address').should('have.text', 'Address: '+selectedHotel.address);
        cy.get('#hotel-coordinates').should('have.text', 'Lat: '+selectedHotel.latitude+', Lng: '+selectedHotel.longitude);
    })

    it('Selected Hotel Room List State Check', () => {
        hotelRooms = store.getState().RoomDetailReducer;
        numberOfRooms = Object.keys(hotelRooms.roomsList).length;
        cy.log('Number of rooms: '+ numberOfRooms);
        expect(numberOfRooms).above(0);
    })

    it('All room types displayed', () => {
        cy.get('.mantine-Paper-root.mantine-Card-root.mantine-h0tete').should('have.length', numberOfRooms)
    })

    // it('Go Back', () => {
    //     cy.go('back');
    // })
})
