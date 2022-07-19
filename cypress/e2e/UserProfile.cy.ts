/// <reference types="cypress" />
describe('UserProfile', () => {
    const BASE = 'http://localhost:3000/'
    const USER = "UserProfile"
    const BookingKeyOne = "-N6N0uXGbHDWqJlYs2Wl"
    const BookingKeyTwo = '-N6aqJ7W3GEkC3hpGMgH'
    it('not logged in show message and redirect to home', () => {
        // log out
        // cy.get('.FullNavBar').parent().within(() => {
        //     cy.get('Button').contains('Log Out').click()
        // })
        // cy.clearLocalStorage()
        cy.visit(BASE + USER);
        // check alert when cannot find user
        cy.on('window:alert', (t) => {
            //assertions
            expect(t).to.contains('we could not find data');
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
        cy.get('.mantine-1hpwlhz').contains('Customer').next().should('have.text', 'அங்கே வணக்கம், كينوبي العام')
        cy.get('.mantine-1hpwlhz').contains('Contact Details').next().should('have.text', '98684420, bengseng@seng.com')
        cy.get('.mantine-1hpwlhz').contains('Billing Address').next().should('have.text', '8 Somapah Road')
        cy.get('.mantine-1hpwlhz').contains('Special Requests').next().should('have.text', 'google black pudding')
        cy.get('.mantine-1hpwlhz').contains('Price').next().should('have.text', '416.14 SGD')
        cy.get('.mantine-1hpwlhz').contains('Destination').next().should('have.text', 'Singapore, Singapore (RsBU)')
        cy.get('.mantine-1hpwlhz').contains('Hotel').next().should('have.text', 'Sofitel Singapore City Centre, 9 Wallich Street (cKGT)')
        cy.get('.mantine-1hpwlhz').contains('Number of Nights').next().should('have.text', '1 Night(s)')
        cy.get('.mantine-1hpwlhz').contains('Dates').next().should('have.text', '07/07/2024 to 08/07/2024')
        cy.get('.mantine-1hpwlhz').contains('Guests').next().should('have.text', 'Adults: 2, Children: 2')
        cy.get('.mantine-1hpwlhz').contains('Rooms').next().should('have.text', '2 Room(s)')
        cy.get('.mantine-1hpwlhz').contains('Card Used').next().should('have.text', 'xxxxxxxxxxxx4710')
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
        cy.get('.icon.icon-tabler.icon-tabler-circle-check').should('have.length', 2);
        cy.get('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').eq(0).click();
        cy.get('button').contains("Cancel Booking").click();
        cy.wait(2800);
        cy.get('.icon.icon-tabler.icon-tabler-circle-check').should('have.length', 3);
        // log out
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log Out').click();
        });
    });
});