/// <reference types="cypress" />

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
    cy.wait(4500)

    cy.get('.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').then(($el) => {
        numberOfHotels = $el.length;
        cy.log("Number of hotels: "+numberOfHotels);
    })
})

const testIndex = [1,2,3];

testIndex.forEach((index) => {
    describe('Room Details System Test '+index, () => {

        before(() => {
            cy.get('.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').eq(index).click();
            cy.wait(4500);
        });
        it("check search query is correct",() => {
            cy.get('#rooms').contains("Rooms: 1") 
            cy.get("#guests").contains("Adults: 2, Children: 0")
            cy.get("#hotel-dates").contains("07/07/2024 to 08/07/2024 for 1 night(s)")
        })
    
        it('Check Google Maps embed loads', () => {
            cy.get('.gm-style > iframe').should('exist');
        });
    
        it('Check valid room select buttons', () => {
            cy.get('[href="/BookingData"]').should('have.length.above',0);
        })
    
        it('Go Back', () => {
            cy.go('back');
            cy.url().should('contain', '/SearchResults')
        })
    })
})

