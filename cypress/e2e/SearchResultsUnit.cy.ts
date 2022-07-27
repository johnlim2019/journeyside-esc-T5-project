/// <reference types="cypress" />
import hotelArray from '../../public/testSet.json';
import { getCardValues, isSale, sortResults, getStars } from '../../src/features/2_SearchResults/SearchItem/SearchItem';
console.log(hotelArray);

describe("search Results unit testing", () => {
    it('test getCardValues()', () => {
        const [imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice] = getCardValues(hotelArray[0], 1);
        const answer = ["https://d2ey9sqrvkqdfs.cloudfront.net/0aMv/1.jpg", 5.0, 4.0, 'blue', "11.3", "500.00", "550.00"];
        console.log([imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice]);
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
    it('test Sort by stars', () => {
        let hotelArraySort = [...hotelArray];
        sortResults(hotelArraySort, "Rating");
        let sortedArray: number[] = [];
        for (let i = 0; i < hotelArraySort.length; i++) {
            sortedArray.push(hotelArraySort[i].rating);
        }
        const expected = [
            5,
            5,
            5,
            5,
            4,
            4,
            4,
            4,
            4,
            4,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            2,
            1.5,
            1,
            1,
            1,
        ]
        assert.deepEqual(expected,sortedArray)
    })
    it('test Sort by reviews', () => {
        let hotelArraySort = [...hotelArray];
        sortResults(hotelArraySort, "Reviews");
        let sortedArray: number[] = [];
        for (let i = 0; i < hotelArraySort.length; i++) {
            sortedArray.push(hotelArraySort[i].trustyou.score.kaligo_overall);
        }
        const expected = [
            4,
            4,
            4,
            4,
            4,
            3,
            3,
            3,
            3,
            3,
            2,
            2,
            2,
            2,
            2,
            1,
            1,
            1,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
        ]
        assert.deepEqual(expected,sortedArray)
    })
    it('test Sort by price', () => {
        let hotelArraySort = [...hotelArray];
        sortResults(hotelArraySort, "Price");
        let sortedArray: number[] = [];
        for (let i = 0; i < hotelArraySort.length; i++) {
            sortedArray.push(hotelArraySort[i].converted_price);
        }
        const expected = [
            95,
            100,
            100,
            120,
            120,
            210,
            210,
            250,
            269,
            281.25,
            281.25,
            300,
            320,
            337.5,
            350,
            370,
            380,
            380,
            400,
            500,
            500,
            500,
            500,
            600,
            600,
        ]
        assert.deepEqual(expected,sortedArray)
    })
    it('test Sort by sale', () => {
        let hotelArraySort = [...hotelArray];
        sortResults(hotelArraySort, "Sale");
        let sortedArray: number[] = [];
        for (let i = 0; i < hotelArraySort.length; i++) {
            sortedArray.push(+((hotelArraySort[i].coverted_max_cash_payment-hotelArraySort[i].converted_price)/hotelArraySort[i].coverted_max_cash_payment).toFixed(10));
        }
        const expected = [
            0.2058823529,
            0.2000000000,
            0.2000000000,
            0.2000000000,
            0.2000000000,
            0.1666666667,
            0.1666666667,
            0.1666666667,
            0.1555555556,
            0.1542857143,
            0.1466666667,
            0.1428571429,
            0.1314285714,
            0.1250000000,
            0.1228070175,
            0.1228070175,
            0.1000000000,
            0.1000000000,
            0.0909090909,
            0.0857142857,
            0.0435555556,
            0.0404040404,
            0.0400000000,
            0.0400000000,
            0.0000000000,
        ]
        console.log(sortedArray)
        console.log(expected)
        assert.deepEqual(expected,sortedArray)
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
        const stars: string[] = ['IconStarHalf', 'IconStar'];
        let k = 0;
        for (let i = 1.5; i <= 5; i += 0.5) {
            let j = Number(i.toFixed(1));
            let lengthTrue = lengthStarsArr[k];
            let htmlElementTrue = stars[k % 2];
            // console.log(Math.ceil(j));
            let length = getStars(j).props.children.length;
            let htmlElement = getStars(j).props.children[Math.ceil(j) - 1].props.children.type.name;
            console.log(htmlElement);
            console.log(length);
            assert.equal(length, lengthTrue);
            assert.equal(htmlElement, htmlElementTrue);
            k++;
        }
    })
    it('set local cache', () => {

    })
})