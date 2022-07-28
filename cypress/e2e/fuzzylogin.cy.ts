/// <reference types="cypress" />

function usernameGen(illegal: boolean) {
  let string = "";
  const charset = "qwertyuiopasdfghjklzxcvbnm,./;'[]=-0987654321!@#$%^&*()_+;ςερτυθιοπασδφγηξκλζχψωβνμ:΅ΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
  if (illegal) {
    const choose = Math.random();
    let usernameLength = -1;
    if (choose <= 0.5) {
      usernameLength = 7;
    }
    else {
      usernameLength = 25;
    }
    let length = 0;
    if (usernameLength > 7) {
      length = Math.ceil(Math.random() * usernameLength) + 25;
    }
    else {
      length = Math.floor(Math.random() * usernameLength);
    }
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * charset.length);
      string += charset.substring(charIndex, charIndex + 1);
    }
  }
  else {
    let length = Math.floor(Math.random() * (25 - 8)) + 8;
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * charset.length);
      string += charset.substring(charIndex, charIndex + 1);
    }
  }
  return string
}

function illegalPasswords(illegal: boolean) {
  let string = "";
  const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMςερτυθιοπασδφγηξκλζχψωβνμΜΝΒΩΨΧΖΑΣΔΦΓΗΞΚΛΠΟΙΘΥΤΡΕ΅ضصثقفغعهخحشسيبلاتنممئءؤرلاىة"
  const symbols = ",./;'[]=-!@#$%^&*()_+}{:\"?><"
  if (illegal) {
    let length = 10
    let index = Math.floor(Math.random() * letters.length)
    for (let i = 0; i < length; i++) {
      string += letters[index]
    }
    if (Math.random() < 0.333) {
      string += symbols[Math.floor(Math.random() * symbols.length)]
    }
    else if (Math.random() > 0.666) {
      string += String(Math.floor(Math.random() * 9))
    }
    else {
      string += "LOL"
    }
  }
  else {
    let length = 10
    let index = Math.floor(Math.random() * letters.length)
    for (let i = 0; i < length; i++) {
      string += letters[index]
    }
    string += symbols[Math.floor(Math.random() * symbols.length)]
    string += String(Math.floor(Math.random() * 9))

  }
  return string
}
describe('fuzzy login spec', () => {
  const testIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  before(() => {
    cy.visit('http://localhost:3000')
    cy.get('.FullNavBar').within(() => {
      cy.get('button').contains('Log in').click()
    })
  })

  testIndex.forEach((index) => {
    describe(`Test ${index}`, () => {
      it("illegal usernames", () => {
        let string = usernameGen(true);
        cy.get('.LogInModal').within(() => {
          cy.get('input[placeholder="User Name"]').type('{selectAll}{backspace}' + string).blur();
          cy.get('div').contains('Username must be between 8 to 25 characters.')
          cy.get('Button').contains('Log In').click()
          cy.get('Button').contains('Create Account').click()
        })
      })
      it("legal usernames", () => {
        let string = usernameGen(false);
        cy.get('.LogInModal').within(() => {
          cy.get('input[placeholder="User Name"]').type('{selectAll}{backspace}' + string).blur();
          cy.get('div').contains('Username must be between 8 to 25 characters.').should('not.exist')
          cy.get('Button').contains('Log In').click()
          cy.get('div').contains('*Password or Username is Invalid')
        })        
      })
      it("illegal passwords", () => {
        let string = illegalPasswords(true);
        cy.get('.LogInModal').within(() => {
          cy.get('input[placeholder="Password"]').type('{selectAll}{backspace}' + string).blur();
          cy.get('div').contains('Need 1 symbol, 1 number, 1 letter')
          cy.get('Button').contains('Log In').click()
          cy.get('Button').contains('Create Account').click()
        })
      })
      it("legal passwords", () => {
        let string = illegalPasswords(false);
        cy.get('.LogInModal').within(() => {
          cy.get('input[placeholder="Password"]').type('{selectAll}{backspace}' + string).blur();
          cy.get('div').contains('Need 1 symbol, 1 number, 1 letter').should('not.exist')
          cy.get('Button').contains('Log In').click()
          cy.get('div').contains('*Password or Username is Invalid')
        })
      })
    })
  })
})