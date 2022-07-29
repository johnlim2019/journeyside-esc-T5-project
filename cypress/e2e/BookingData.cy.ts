/// <reference types="cypress" />
describe('BookingData', () => {
  const BASE = 'http://localhost:3000/'
  const SEARCHRESULT = "SearchResults"
  const USER = "UserProfile"
  const BOOKING = "BookingData"
  const LOCATION = "Singapore, Singapore"
  beforeEach(() => {
    cy.visit(BASE)
    // log out
    // cy.get('.FullNavBar').parent().within(() => {
    //   cy.get('Button').contains('Log Out').click()
    // })

    cy.get('input').first().focus().type(LOCATION)
    cy.get('.mantine-DateRangePicker-wrapper.mantine-12sbrde').parent().within(() => {
      cy.get('input').click()
    })
    cy.get('.mantine-UnstyledButton-root.mantine-DateRangePicker-calendarHeaderLevel.mantine-1xk0qjw').click()
    cy.get('button').contains('Dec').click()
    cy.get('button').contains('17').click()
    cy.get('button').contains('18').click()
    cy.get('div').contains('Adults').parent().within(() => {
      cy.get('select').select(2)
    })
    cy.get('div').contains('Kids').parent().within(() => {
      cy.get('select').select(2)
    })
    cy.get('div').contains('Rooms').parent().within(() => {
      cy.get('select').select(1)
    })
    cy.wait(1000)
    cy.get('.mantine-Grid-root.mantine-pafeaw').parent().within(() => {
      cy.get('Button').last().click()
    })
    cy.wait(4000)
    cy.get('.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').last().click()
    cy.wait(4000)
    cy.get('a[href="/BookingData"]').first().click()

  })
  it('check for invalid data and pls login notification', () => {
    cy.wait(100)
    cy.get('.salutation').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}i identify as a pencil')
      cy.get('div').contains('Invalid Salutation').should('be.exist')
      cy.get('input').type('{selectAll}{backspace}{enter}google black pudding 😊😊{enter}')
      cy.get('div').contains('Invalid Salutation').should('be.exist')
      cy.get('input').type('{selectAll}{backspace}{enter}')
      cy.get('div').contains('Invalid Salutation').should('be.exist')

    })
    cy.get('.firstName').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}')
      cy.get('div').contains('Please Enter Valid First Name').should('be.exist')
      cy.get('input').type('{selectAll}{backspace}{enter}google black pudding 😊😊{enter}')
      cy.get('div').contains('Please Enter Valid First Name').should('be.exist')
    })
    cy.get('.lastName').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}')
      cy.get('div').contains('Please Enter Valid Last Name').should('be.exist')
      cy.get('input').type('{selectAll}{backspace}{enter}google black pudding 😊😊{enter}')
      cy.get('div').contains('Please Enter Valid Last Name').should('be.exist')
    })
    cy.get('.phone').parent().within(() => {
      cy.get('input').type('1831273{enter}')
      cy.get('div').contains('Invalid Phone Number').should('be.exist')
    })
    cy.get('.email').parent().within(() => {
      cy.get('input').type('jskghak{enter}')
      cy.get('div').contains('Invalid email').should('be.exist')
    })
    cy.get('.specialReq').parent().within(() => {
      cy.get('input').type('google black pudding 😊😊{enter}')
      cy.get('div').contains('Invalid Character Detected')
    })
    cy.get('.specialReq').parent().within(() => {
      cy.get('input').focus().type('{selectAll}{backspace}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in libero eget elit elementum fermentum ut ut ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut fermentum lorem id scelerisque varius. Cras augue ipsum, interdum sed consectetur vel, suscipit in leo. Vivamus nec nibh vel velit dictum sollicitudin vitae at mauris. Mauris rutrum risus eu feugiat scelerisque. Sed tempus nunc vel felis egestas porttitor. Donec bibendum interdum risus non consequat. Ut sit amet dolor gravida, aliquam augue et, semper sem. Morbi enim mi, venenatis a consequat at, pretium vitae tellus. Nulla lacinia velit et ipsum dignissim tincidunt id at urna. Donec non enim tempor, viverra elit ac, facilisis ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis nec est vehicula, viverra lorem finibus, accumsan dolor. Curabitur porta condimentum ante, eu lobortis nisi consequat eget. Aliquam ut sem id risus porta cursus a vitae diam. Quisque non diam sed justo fringilla pellentesque. Aliquam facilisis commodo enim, a vehicula ipsum imperdiet sit amet. Pellentesque viverra dui eget venenatis aliquam. Pellentesque rhoncus, leo id rhoncus finibus, eros ligula dignissim sem, quis consequat nulla turpis ut nibh. Sed at dolor at ex vehicula cursus. Nullam a tristique risus, vitae porta enim. Proin elementum cursus justo, nec elementum leo egestas sit amet. Pellentesque ac lacus suscipit, vehicula urna ac, bibendum nisl. Morbi pretium, lacus sed sagittis fermentum, ligula tellus porttitor ligula, id varius diam massa at quam. Suspendisse efficitur ultrices mi nec dapibus.{enter}')
      cy.get('div').contains('250 Words Max')
    })
    cy.get('.cardNum').parent().within(() => {
      cy.get('input').type('18346791{enter}')
      cy.get('div').contains('Invalid Card').should('be.exist')
    })
    cy.get('.expiryMonth').parent().within(() => {
      cy.get('input').first().type('{selectAll}{backspace}7{enter}')
    })
    cy.get('.expiryYear').parent().within(() => {
      cy.get('input').first().type('{selectAll}{backspace}21{enter}')
      cy.get('div').contains('Expired Card?').should('be.exist')
    })
    cy.get('.cvv').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.address').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}🧑‍🦳✨😊{enter}')
      cy.get('div').contains('Please Enter Valid Address')
      cy.get('input').type('{selectAll}{backspace}{enter}')
      cy.get('div').contains('Please Enter Valid Address')
    })
    // press submit button 
    cy.get('.submitBtn').parent().within(() => {
      cy.get('button').click()
    })
    // cy.pause()
    cy.on('window:alert', (t) => {
      //assertions
      expect(t).to.contains('Please login');
    })
  })
  it('check submission cheangemind showing and with filled in special requests', () => {
    cy.get('.firstName').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.lastName').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.phone').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.email').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.specialReq').parent().within(() => {
      cy.get('input').type('google black pudding')
    })
    cy.get('.cardNum').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.expiryMonth').parent().within(() => {
      cy.get('input').first().focus()
    })
    cy.get('.expiryYear').parent().within(() => {
      cy.get('input').first().focus()
    })
    cy.get('.cvv').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.address').parent().within(() => {
      cy.get('input').focus()
    })
    // login
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log in').click()
    }).then(() => {
      cy.get('.LogInModal').parent().within(() => {
        cy.get('Button').contains('Log In').click()
      })
    })
    // press submit button 
    cy.get('.submitBtn').parent().within(() => {
      cy.get('button').click()
    })
    cy.get('.confirmModal').parent().within(() => {
      cy.get('button').first().click()
    })
    cy.url().should('eq', BASE + BOOKING)
    // log out at end of test
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log Out').click()
    })
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('User Profile').should('not.exist')
    })
    cy.wait(1000)
  })
  it('check submission successful and with empty special requests', () => {
    cy.get('.firstName').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}அங்கே வணக்கம்')
    })
    cy.get('.lastName').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}كينوبي العام')
    })
    cy.get('.phone').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.email').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.specialReq').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.cardNum').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.expiryMonth').parent().within(() => {
      cy.get('input').first().focus()
    })
    cy.get('.expiryYear').parent().within(() => {
      cy.get('input').first().focus()
    })
    cy.get('.cvv').parent().within(() => {
      cy.get('input').focus()
    })
    cy.get('.address').parent().within(() => {
      cy.get('input').focus()
    })
    // login
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log in').click()
    }).then(() => {
      cy.get('.LogInModal').parent().within(() => {
        cy.get('Button').contains('Log In').click()
      })
    })
    // cy.pause()
    // press submit button 
    cy.get('.submitBtn').parent().within(() => {
      cy.get('button').click();
    })
    cy.get('.confirmModal').parent().within(() => {
      cy.get('button').contains('Confirm').first().click();
    })
    cy.wait(1000)
    cy.url().should('eq', BASE+SEARCHRESULT)
    // log out at end of test
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log Out').click()
    })
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('User Profile').should('not.exist')
    })
  })
})

