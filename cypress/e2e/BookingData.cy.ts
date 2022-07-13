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

    cy.wait(1000)
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
    // cy.pause()
    cy.get('.mantine-Grid-root.mantine-pafeaw').parent().within(() => {
      cy.get('Button').last().click()
    })

    cy.wait(4500)
    cy.get('.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').last().click()
    cy.wait(1000)
    cy.get('a.mantine-Button-filled.mantine-Button-root.mantine-ldof9z').first().click()

  })
  it('check for invalid data', () => {
    cy.get('.firstName').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}')
      cy.get('div').contains('Please Enter First Name').should('be.exist')
      })
    cy.get('.lastName').parent().within(() => {
      cy.get('input').type('{selectAll}{backspace}{enter}')
      cy.get('div').contains('Please Enter Last Name').should('be.exist')
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
      cy.get('input').type('google black pudding')
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
      cy.get('input').focus()
    })
  })
  it('check submission successful', () => {
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
      cy.get('a').first().click()
    })
    cy.url().should('eq', BASE + SEARCHRESULT)
    // log out at end of test
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log Out').click()
    })
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('User Profile').should('not.exist')
    })  
  })
  it('check submission cheangemind', () => {
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
    // log out 
    cy.get('.FullNavBar').parent().within(() => {
      cy.get('Button').contains('Log Out').click()
    })
    cy.url().should('eq', BASE)
  })
  it('check alert if not logged in', () => {
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
    // press submit button 
    cy.get('.submitBtn').parent().within(() => {
      cy.get('button').click()
    })
    // cy.pause()
    cy.on('window:alert',(t)=>{
      //assertions
      expect(t).to.contains('Pls Login');
    })
  })
})
