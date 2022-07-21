/// <reference types="cypress" />
import { validateCache } from '../../src/Browser-Storage';
import workingCache from '../../public/workingCache.json'
import { validateHotelApiData, validatePriceApiData } from '../../src/features/2_SearchResults/SearchBar/SearchBar'
import hotelData from '../../public/RsBU.json';
import hotelPrice from '../../public/prices/RsBU.json';
import hotelDataCorrupt from '../../public/corrupted_samples/RsBU_corrupted.json'
import hotelPriceCorrupt from '../../public/corrupted_samples/prices_corrupted.json'
import corruptedCache from '../../public/corruptedCache.json'

const WorkingString = JSON.stringify(workingCache);
const corruptedString = JSON.stringify(corruptedCache);
describe('check for corrupt data', () => {
  it('check cache valid', () => {
    console.log(validateCache(WorkingString));
    assert.equal(validateCache(WorkingString), true);
  })
  it('check cache invalid', () => {    
    assert.equal(validateCache(corruptedString), false);
  })
  it('check valid hotel and price api data', () => {
    assert.equal(validateHotelApiData(hotelData), true);
    assert.equal(validatePriceApiData(hotelPrice), true);
  })
  it('check invalid hotel and price api data', () => {
    assert.equal(validatePriceApiData(hotelPriceCorrupt), false);
    assert.equal(validateHotelApiData(hotelDataCorrupt), false);
  })
})