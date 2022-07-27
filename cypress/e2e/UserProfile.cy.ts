/// <reference types="cypress" />
describe('UserProfile', () => {
    const BASE = 'http://localhost:3000/'
    const USER = "UserProfile"
    const BookingKeyOne = "1617711a-644d-409d-a6f8-b1386bebd583"
    const BookingKeyTwo = '6ae3e4b7-0240-4b6c-ae62-52152d5547ed'
    const BookingKeyThree = '14d1435b-cbe7-432e-8852-56675e256924'
    it('not logged in show message and redirect to home', () => {
        // log out
        // cy.get('.FullNavBar').parent().within(() => {
        //     cy.get('Button').contains('Log Out').click()
        // })
        // cy.clearLocalStorage()
        cy.visit(BASE + USER);
        cy.reload(true);
        // check alert when cannot find user
        cy.on('window:alert', (t) => {
            //assertions
            expect(t).to.contains('Session Expired');
        });
        cy.get('div').contains('Not Logged In');
        cy.wait(3000);
        cy.url().should('eq',BASE);
    }); 
    it('user profile check if can select right item and decrypt data correctly', () => {
        cy.visit(BASE);
        // login
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log in').click()
        }).then(() => {
            cy.get('input[placeholder="User Name"]').type("{selectAll}{backspace}johnlim")
            cy.get('.LogInModal').parent().within(() => {
                cy.get('Button').contains('Log In').click()
            })
        })
        // go to page
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('User Profile').click()
        })
        cy.url().should('eq', BASE + USER)
        cy.wait(3000)
        cy.get('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').parent().within(() => { cy.get('svg') }).first().click();
        // checking inner html use have.text
        cy.get('.mantine-1hpwlhz').contains('Booking ID').next().should('have.text', BookingKeyOne)
        cy.get('button').contains("Return").click()
        // when there are multiple elements use eq to select index of the list of elements 0 - nth element
        cy.get('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').eq(1).click()
        cy.get('.mantine-1hpwlhz').contains('Booking ID').next().should('have.text', BookingKeyTwo)
        cy.get('button').contains("Return").click()
        cy.get('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').eq(2).click()
        cy.get('.mantine-1hpwlhz').contains('Booking ID').next().should('have.text', BookingKeyThree)
        // cy.get('.mantine-1hpwlhz').contains('Customer').next().should('have.text', 'அங்கே வணக்கம், كينوبي العام')
        // cy.get('.mantine-1hpwlhz').contains('Contact Details').next().should('have.text', '98684420, bengseng@seng.com')
        // cy.get('.mantine-1hpwlhz').contains('Billing Address').next().should('have.text', '8 Somapah Road')
        // cy.get('.mantine-1hpwlhz').contains('Special Requests').next().should('have.text', 'google black pudding')
        // cy.get('.mantine-1hpwlhz').contains('Destination').next().should('have.text', 'Singapore, Singapore (RsBU)')
        // cy.get('.mantine-1hpwlhz').contains('Hotel').next().should('have.text', 'Sofitel Singapore City Centre, 9 Wallich Street (cKGT)')
        // cy.get('.mantine-1hpwlhz').contains('Number of Nights').next().should('have.text', '1 Night(s)')
        // cy.get('.mantine-1hpwlhz').contains('Dates').next().should('have.text', '07/07/2024 to 08/07/2024')
        // cy.get('.mantine-1hpwlhz').contains('Guests').next().should('have.text', 'Adults: 2, Children: 0')
        // cy.get('.mantine-1hpwlhz').contains('Rooms').next().should('have.text', '1 Double or Twin PREMIER COURTYARD with breakfast')
        // cy.get('.mantine-1hpwlhz').contains('Card Used').next().should('have.text', 'xxxxxxxxxxxx4710')
        // cy.get('.mantine-1hpwlhz').contains('Cancellation').next().should('have.text', 'Free Cancellation')
        // cy.get('.mantine-1hpwlhz').contains('Breakfast Included').next().should('have.text', 'Yes')

        cy.get('button').contains("Return").click()
        // cy.pause()
        // log out
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log Out').click()
        })
        // cy.pause()
    })
    it('can cancel booking', () => {
        cy.visit(BASE);
        // log out
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log Out').click();
        });
        // login
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log in').click();            
        }).then(() => {
            cy.get('input[placeholder="User Name"]').type("{selectAll}{backspace}johnlim")
            cy.get('.LogInModal').parent().within(() => {
                cy.get('Button').contains('Log In').click();
            });
        });
        // go to page
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('User Profile').click();
        });
        cy.url().should('eq', BASE + USER);
        cy.wait(3000);
        cy.get('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').eq(0).click();
        cy.get('button').contains("Cancel Booking").click();
        // wait for refresh
        cy.wait(2800);
        cy.get('.icon.icon-tabler.icon-tabler-circle-x').should('have.length', 1);
        cy.get('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').eq(0).click();
        cy.get('button').contains("Cancel Booking").click();
        cy.wait(2800);  
        // log out
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log Out').click();
        });
    });
});