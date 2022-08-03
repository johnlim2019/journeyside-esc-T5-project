/// <reference types="cypress" />

function generateIllegalNames(illegal) {
  const charset = "qwertyuiopasdfghjklzxcvbnmςερτυθιοπασδφγηξκλζχψωβνμΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
  let output = "";
  var length;
  if (illegal) {
    length = 30
    if (Math.random() < 0.5) {
      length = 0
    }
    let counting = length * Math.random() + length;
    const illegalchars = "<>?:\"{}+_)(*&^%$#@!~`,.;/'][=-😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
    let chosenCharSet = charset;
    if (Math.random() < 0.5) {
      chosenCharSet = illegalchars;
    }
    for (let i = 0; i < counting; i++) {
      let charIndex = Math.floor(Math.random() * chosenCharSet.length);
      output += chosenCharSet.substring(charIndex, charIndex + 1);
    }
  } else {
    let counting = 25 * Math.random() + 1
    for (let i = 0; i < counting; i++) {
      let charIndex = Math.floor(Math.random() * charset.length);
      output += charset.substring(charIndex, charIndex + 1);
    }
  }
  return output
}
function generateIllegalSalutations(illegal) {
  const charset = "qwertyuiopasdfghjklzxcvbnmςερτυθιοπασδφγηξκλζχψωβνμΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
  let output = "";
  var length;
  if (!illegal) {
    // correct length
    length = 6
    let counting = length * Math.random() + 1;
    for (let i = 0; i < counting; i++) {
      let charIndex = Math.floor(Math.random() * charset.length);
      output += charset.substring(charIndex, charIndex + 1);
    }
  } else {
    const illegalchars = "<>?:\"{}+_)(*&^%$#@!~`,.;/'][=-😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
    let chosenCharSet = charset;
    if (Math.random() < 0.5) {
      // wrong charset 
      chosenCharSet = illegalchars;
      for (let i = 0; i < 6; i++) {
        let charIndex = Math.floor(Math.random() * chosenCharSet.length);
        output += chosenCharSet.substring(charIndex, charIndex + 1);
      }
    } else {
      // wrong length 
      let counting = 8 * Math.random() + 9
      if (Math.random() < 0.5) {
        counting = 0
      }
      for (let i = 0; i < counting; i++) {
        let charIndex = Math.floor(Math.random() * chosenCharSet.length);
        output += chosenCharSet.substring(charIndex, charIndex + 1);
      }
    }

  }
  return output
}

function generateIllegalLongInput(illegal) {
  const charset = "qwertyuiopasdfghjklzxcvbnm         ,./;'[]=-0987654321!@#$%^&*()_+;      ςερτυθιοπασδφγηξκλζχψωβνμ:        ΅ΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜ      ضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
  const illegalchars = "😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
  let output = "";
  var length;
  if (illegal) {
    length = 30
    let counting = length * Math.random() + length;
    for (let i = 0; i < counting; i++) {
      let charIndex = Math.floor(Math.random() * illegalchars.length);
      output += illegalchars.substring(charIndex, charIndex + 1);
      if (Math.random() < 0.5) {
        charIndex = Math.floor(Math.random() * charset.length);
        output += charset.substring(charIndex, charIndex + 1);
      }
    }
  } else {
    let counting = 30 * Math.random() + 1
    for (let i = 0; i < counting; i++) {
      let charIndex = Math.floor(Math.random() * charset.length);
      output += charset.substring(charIndex, charIndex + 1);
    }
  }
  return output
}


function generateRandomNumber() {
  const charset = "1234567890";
  let output = "";
  const choose = Math.random();
  let length = -1;
  if (choose <= 0.5) {
    length = 9;
  }
  else {
    length = 16;
  }
  for (let i = 0; i < length; i++) {
    let charIndex = Math.floor(Math.random() * charset.length);
    output += charset.substring(charIndex, charIndex + 1);
  }
  return output
}

function generateLegalEmail() {
  const charset = "abcdefghjklmnopqrstuvwxyz"
  const back = "@gmail.com"
  let output = ""
  for (let i = 0; i < 12; i++) {
    let charIndex = Math.floor(Math.random() * charset.length);
    output += charset.substring(charIndex, charIndex + 1);
  }
  output = output + back
  return output
}

function generateLegalNumber() {
  const charset = '1234567890'
  let output = "9"
  for (let i = 0; i < 7; i++) {
    let charIndex = Math.floor(Math.random() * charset.length);
    output += charset.substring(charIndex, charIndex + 1);
  }
  return output
}

function generateIllegalEmail() {
  const charset = "abcdefghjklmnopqrstuvwxyz"
  let back = ""
  for (let i = 0; i < 7; i++) {
    let charIndex = Math.floor(Math.random() * charset.length);
    back += charset.substring(charIndex, charIndex + 1);
  }
  let back1 = ""
  for (let i = 0; i < 10; i++) {
    let charIndex = Math.floor(Math.random() * charset.length);
    back1 += charset.substring(charIndex, charIndex + 1);
  }
  let output = ""
  for (let i = 0; i < 12; i++) {
    let charIndex = Math.floor(Math.random() * charset.length);
    output += charset.substring(charIndex, charIndex + 1);
  }
  output = output + "@" + back + "." + back1
  return output
}


describe('fuzzy booking  spec', () => {
  const BASE = 'http://localhost:3000/'
  const SEARCHRESULT = "SearchResults"
  const USER = "UserProfile"
  const BOOKING = "BookingData"
  const LOCATION = "Singapore, Singapore"
  before(() => {
    cy.visit(BASE)
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
  const testIndex = [1, 2, 3, 4, 5];
  testIndex.forEach((index) => {
    describe(`Test ${index}`, () => {
      it("illegal variables", () => {
        cy.scrollTo("bottom")
        const illegalname = generateIllegalNames(true)
        const illegalsalutation = generateIllegalSalutations(true)
        const illegalnumber = generateRandomNumber()
        const illegallonginput = generateIllegalLongInput(true)
        const illegalemail = generateIllegalEmail();
        cy.get('.salutation').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + illegalsalutation + '{enter}')
          cy.get('div').contains('Invalid Salutation').should('be.exist')
        })
        cy.wait(100)
        cy.get('.firstName').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}{enter}' + illegalname + '{enter}')
          cy.get('div').contains('Please Enter Valid First Name').should('be.exist')
        })
        cy.wait(100)
        cy.get('.lastName').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}{enter}' + illegalname + '{enter}')
          cy.get('div').contains('Please Enter Valid Last Name').should('be.exist')
        })
        cy.wait(100)
        cy.get('.phone').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}{enter}' + illegalnumber + '{enter}')
          cy.get('div').contains('Invalid Phone Number').should('be.exist')
        })
        cy.wait(100)
        cy.get('.email').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + illegalemail + '{enter}')
          cy.get('div').contains('Invalid email').should('be.exist')
        })
        cy.get('.specialReq').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + illegallonginput + '{enter}')
          cy.get('div').contains('Invalid Character Detected')
        })
        cy.wait(100)
        cy.get('.cardNum').parent().within(() => {
          cy.get('input').focus()
        })
        cy.get('.expiryMonth').parent().within(() => {
          cy.get('input').first().focus()
        })
        cy.get('.expiryYear').parent().within(() => {
          cy.get('input').first().focus()
        })
        cy.wait(100)
        cy.get('.address').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}{enter}' + illegallonginput + '{enter}')
          cy.get('div').contains('Please Enter Valid Address')
        })
        cy.wait(100)
      })
      it('legal variables', () => {
        cy.wait(1000)
        cy.get('.salutation').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + generateIllegalSalutations(false) + '{enter}')
          cy.get('div').contains('Invalid Salutation').should('not.exist')
        })
        cy.get('.firstName').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + generateIllegalNames(false) + '{enter}')
          cy.get('div').contains('Please Enter Valid First Name').should('not.exist')
        })
        cy.get('.lastName').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + generateIllegalNames(false) + '{enter}')
          cy.get('div').contains('Please Enter Valid Last Name').should('not.exist')
        })
        cy.get('.phone').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + generateLegalNumber() + '{enter}')
          cy.get('div').contains('Invalid Phone Number').should('not.exist')
        })
        cy.get('.email').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + generateLegalEmail() + '{enter}')
          cy.get('div').contains('Invalid email').should('not.exist')
        })
        cy.get('.specialReq').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}' + generateIllegalNames(false) + '{enter}')
          cy.get('div').contains('Invalid Character Detected').should('not.exist')
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
        cy.get('.address').parent().within(() => {
          cy.get("input").type('{selectAll}{backspace}{enter}' + generateIllegalNames(false) + '{enter}')
          cy.get('div').contains('Please Enter Valid Address').should('not.exist')
        })
      })
    })
  })
})