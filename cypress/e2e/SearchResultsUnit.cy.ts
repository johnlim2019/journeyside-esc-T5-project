/// <reference types="cypress" />
import hotelArray from './testSet.json';
import { getCardValues, isSale, sortResults } from '../../src/features/2_SearchResults/SearchItem/SearchItem';
console.log(hotelArray);

describe("search Results unit testing",()=>{
    it('test',()=>{})
    it('test getCardValues()',()=>{
        const [imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice] = getCardValues(hotelArray[0]);
        const answer = ["https://d2ey9sqrvkqdfs.cloudfront.net/0aMv/1.jpg",5.0,4.0,'blue',"11.3","425.00",550];
        assert.deepEqual([imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice],answer);
    })
})