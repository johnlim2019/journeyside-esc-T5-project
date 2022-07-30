/// <reference types="cypress" />
describe('UserProfile', () => {
    const BASE = 'http://localhost:3000/'
    const USER = "UserProfile"
    const NuVe = "1617711a-644d-409d-a6f8-b1386bebd583"
    const Wang = '6ae3e4b7-0240-4b6c-ae62-52152d5547ed'
    const Wink = '14d1435b-cbe7-432e-8852-56675e256924'
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
        cy.url().should('eq', BASE);
    })
    it('check login modal', () => {
        cy.visit(BASE);
        // login
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log in').click()
        }).then(() => {
            cy.get('.LogInModal').parent().within(() => {
                cy.get('Button').contains('Create Account').click()
            })
            cy.get("div").contains("*User already exits")
            cy.get('input[placeholder="User Name"]').type("{selectAll}{backspace}")
            cy.get('.LogInModal').parent().within(() => {
                cy.get('Button').contains('Log In').click()
            })
        })

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
        cy.get('td').contains('Wink').nextUntil('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').within(() => {
            cy.get('button').first().click()
        })
        cy.get('.mantine-1hpwlhz').contains('Booking ID').next().should('have.text', Wink)
        cy.get('button').contains("Return").click()
        cy.get('td').contains('NuVe').nextUntil('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').within(() => {
            cy.get('button').first().click()
        })
        cy.get('.mantine-1hpwlhz').contains('Booking ID').next().should('have.text', NuVe)
        cy.get('button').contains("Return").click()
        cy.get('td').contains('Wang').nextUntil('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').within(() => {
            cy.get('button').first().click()
        })
        cy.get('.mantine-1hpwlhz').contains('Booking ID').next().should('have.text', Wang)
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
        cy.get('.mantine-Button-filled.mantine-Button-root.mantine-1grzg0q').eq(2).click();
        cy.get('button').contains("Cancel Booking").click();
        cy.wait(2800);
        // log out
        cy.get('.FullNavBar').parent().within(() => {
            cy.get('Button').contains('Log Out').click();
        });
    });
});