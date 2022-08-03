/// <reference types="cypress" />

import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect, Tooltip, AutocompleteItem, Loader, Notification } from '@mantine/core';

function generateSearchQueries(value: string, item:AutocompleteItem){
    if (!value.includes(" ")) {
        return item.value.replace(",", "").toLowerCase().trim().includes(value.toLowerCase().trim());
      } else {
        return item.value.replace(",", "").toLowerCase().trim().startsWith(value.toLowerCase().trim());
      }
   
      return null;
 }

 function fuzzinput(illegal: boolean, input:string){
    const illegalchars = "<>?:\"{}+_*&^%$#@!~`;'][=😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
    let trimindex = Math.floor(Math.random()*input.length)
    if (illegal){
        let illegaloutput = fuzzer(input)
        let numberofillegalchars = Math.floor(Math.random() * (5 - 1) + 1)
        for (let i=0; i<numberofillegalchars; i++){
            let index = Math.floor(Math.random() * illegalchars.length)
            illegaloutput+=illegalchars[index]
            let trimnewstring = illegaloutput.slice(trimindex)
            if (index > illegaloutput.length/2)
            illegaloutput = trimnewstring + illegaloutput.slice(0,trimindex) 
        }
        return illegaloutput
    }
    else{
        let output = fuzzer(input)
        return output
    }
    
    }


function fuzzer(input:string){
    const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    const numbers = "0123456789"
    const legalsymbols = ",./-"
        
    let trimindex = Math.floor(Math.random()*input.length)
    let trimstring = input.slice(trimindex)
    let newstring = trimstring + input.slice(0,trimindex) 
    let numberofextraletters = Math.floor(Math.random() * 5)
    let numberofextranumbers = Math.floor(Math.random()*5)
    let numberofextrasymbols = Math.floor(Math.random()*2)
    for (let i = 0; i<numberofextraletters; i++){
        let index = Math.floor(Math.random() * letters.length)
        newstring+=letters[index]
        let trimnewstring = newstring.slice(trimindex)
        if (index > newstring.length/2)
        newstring = trimnewstring + newstring.slice(0,trimindex) 
    }
    for (let j = 0; j<numberofextranumbers; j++){
        let index = Math.floor(Math.random() * numbers.length)
        newstring+=numbers[index]
        let trimnewstring = newstring.slice(trimindex)
        if (index > newstring.length/2)
        newstring = trimnewstring + newstring.slice(0,trimindex) 
    }
    for (let k = 0; k<numberofextrasymbols; k++){
        let index = Math.floor(Math.random() * legalsymbols.length)
        newstring+=legalsymbols[index]
        let trimnewstring = newstring.slice(trimindex)
        if (index > newstring.length/2)
        newstring = trimnewstring + newstring.slice(0,trimindex) 
    }

    return newstring
}

 

 describe('Search Bar Fuzzing Test', ()=>{
    let testinputs = ["Singapore", "Kuala", "Gading"]
    let testdests = ["Singapore, Singapore", "Kuala Lumpur, Malaysia", "Gading, Jakarta, Indonesia", "Bukchon Hanok Village, Seoul, South Korea" ] 
    it("legal destinations", () => {
        cy.visit('http://localhost:3000/SearchResults')
        for (let i = 0; i < testinputs.length; i++){
            const $input = cy.get('.DestinationInput').parent().within(()=>{cy.get('input').focus().clear().type(testinputs[i])})
            $input.type('{enter}')
            //cy.get('.DestinationInput').get('input').should("contain.value", testdests[i])
            cy.get('.notification').children().contains(testdests[i])
            cy.reload()
        }


        })
    
    it("ensure legal mutation-based fuzzing inputs don't crash the page",() => {
        testinputs.forEach(input => {
            var fuzzstring = fuzzinput(false,input)
            const $input = cy.get('.DestinationInput').parent().within(()=>{return cy.get('input').focus().clear().type(fuzzstring);})
            $input.type('{enter}')
            if (!(cy.get(".Autocomplete").contains('Invalid Destination'))){
                cy.get('.loaderSpinner').should('be.exist')
            }

            cy.reload()
        })
        
    })

    it("ensure illegal mutation-based fuzzing inputs are always caught",() => {
        testinputs.forEach(input => {
            var fuzzstring = fuzzinput(true,input)
            const $input = cy.get('.DestinationInput').parent().within(()=>{return cy.get('input').focus().clear().type(fuzzstring);})
            $input.type('{enter}')
            cy.get(".Autocomplete").contains('Invalid Destination')
            cy.reload()
        })
        
    })
        
        
  })
