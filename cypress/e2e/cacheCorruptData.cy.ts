/// <reference types="cypress" />
import { validate } from '../../src/Browser-Storage';
import workingCache from '../../public/workingCache.json'
function shuffle(string:string) {
  var a = string.split(""),
      n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  } 
  return a.join("");
}
const WorkingString = JSON.stringify(workingCache);
describe('check for corrupt data', () => {
  it('check valid', () => {
    console.log(validate(WorkingString));
    assert.equal(validate(WorkingString),true);
  })
  it('check invalid', () => {
    const notWorkingString = shuffle(WorkingString);
    assert.equal(validate(notWorkingString),false);
    
  })
})