/// <reference types="cypress" />
import hotelArray from '../../public/testSet.json';
import { getCardValues, isSale, sortResults, getStars } from '../../src/features/2_SearchResults/SearchItem/SearchItem';
console.log(hotelArray);

describe("search Results unit testing", () => {
    it('test getCardValues()', () => {
        const [imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice] = getCardValues(hotelArray[0]);
        const answer = ["https://d2ey9sqrvkqdfs.cloudfront.net/0aMv/1.jpg", 5.0, 4.0, 'blue', "11.3", "500.00", 550];
        assert.deepEqual([imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice], answer);
    })
    it('test sort results value and empty array', () => {
        let hotelArraySort = [...hotelArray];
        sortResults(hotelArraySort, "Value");
        let sortedArray: String[] = [];
        for (let i = 0; i < hotelArraySort.length; i++) {
            sortedArray.push(hotelArraySort[i].name);
        }
        let valueSortCheck = [
            'MedHighHigh',
            'HighHighHigh',
            'MedMedHigh',
            'HighHighMed',
            'MedHighMed',
            'LowMedHigh',
            'LowLowHigh',
            'MedHighLow',
            'MedMedMed',
            'LowMedMed',
            'HighHighLow',
            'LowMedLow',
            'LowLowMed',
            'MedMedLow',
            'MedHighShit',
            'HighHighShit',
            'HighHighNil',
            'LowMedShit',
            'MedMedShit',
            'LowLowLow',
            'MedHighNil',
            'LowMedNil',
            'MedMedNil',
            'LowLowShit',
            'LowLowNil'
        ]
        assert.deepEqual(sortedArray, valueSortCheck);
        hotelArraySort = [];
        sortResults(hotelArraySort, "Value");
        assert.deepEqual(hotelArraySort, []);
    })
    it('test isSale', () => {
        let price = 990;
        const maxPrice = 1000;
        let badge = isSale(price, maxPrice);
        console.log(badge);
        const [percent_1, percent_1_colour] = [['was ', 1000, " -", "1.0", "%"], "yellow"]
        assert.deepEqual(badge.props.color, percent_1_colour);
        assert.deepEqual(badge.props.children, percent_1);

        price = 950
        badge = isSale(price, maxPrice);
        const [percent_5, percent_5_colour] = [['was ', 1000, " -", "5.0", "%"], "orange"]
        assert.deepEqual(badge.props.color, percent_5_colour);
        assert.deepEqual(badge.props.children, percent_5);

        price = 900
        badge = isSale(price, maxPrice);
        const [percent_10, percent_10_colour] = [['was ', 1000, " -", "10.0", "%"], "pink"]
        assert.deepEqual(badge.props.color, percent_10_colour);
        assert.deepEqual(badge.props.children, percent_10);

        price = 800
        badge = isSale(price, maxPrice);
        const [percent_20, percent_20_colour] = [['was ', 1000, " -", "20.0", "%"], 'red']
        assert.deepEqual(badge.props.color, percent_20_colour);
        assert.deepEqual(badge.props.children, percent_20);
    })
    it('test getStars', () => {
        const lengthStarsArr: number[] = [2, 2, 3, 3, 4, 4, 5, 5];
        const stars: string[] = ['StarHalf', 'Star'];
        let k = 0;
        for (let i = 1.5; i <= 5; i += 0.5) {
            let j = Number(i.toFixed(1));
            let lengthTrue = lengthStarsArr[k];
            let htmlElementTrue = stars[k%2];
            // console.log(Math.ceil(j));
            let length = getStars(j).props.children.length;
            let htmlElement = getStars(j).props.children[Math.ceil(j) - 1].props.children.type.name;
            console.log(htmlElement);
            console.log(length);
            assert.equal(length,lengthTrue);
            assert.equal(htmlElement,htmlElementTrue);
            k++;
        }
    })
    it('set local cache',()=>{

    })
})