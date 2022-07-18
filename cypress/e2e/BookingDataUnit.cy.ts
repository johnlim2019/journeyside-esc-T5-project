/// <reference types="cypress" />

import { getJsonObj, getReadable } from '../../src/features/4_BookingData/BookingData';

// declare variables to be share between test
let initialStateObj: any, form: any;

describe("Unit Test Feature 4", () => {
    // set up the objects that will be used for all test
    before(() => {
        initialStateObj = {
            selectHotelObj: {
                "id": "cqqh",
                "imageCount": 55,
                "latitude": 1.29712,
                "longitude": 103.84047,
                "name": "Lloyd's Inn",
                "address": "2 Lloyd Road",
                "address1": "2 Lloyd Road",
                "rating": 3.5,
                "distance": 11546.131224812349,
                "trustyou": {
                    "id": null,
                    "score": {
                        "overall": null,
                        "kaligo_overall": 0.0,
                        "solo": null,
                        "couple": null,
                        "family": null,
                        "business": null
                    }
                },
                "categories": {},
                "amenities_ratings": [],
                "description": "<p><b>Property Location</b> <br />With a stay at Lloyd's Inn in Singapore (Orchard Road), you'll be minutes from Church of the Sacred Heart and Tan Yeok Nee House.  This hotel is close to Chinatown Heritage Center and National Orchid Garden.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 34 air-conditioned rooms featuring flat-screen televisions. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Bathrooms have showers and complimentary toiletries. Conveniences include laptop-compatible safes and desks, and housekeeping is provided daily.</p><p><b>Amenities</b> <br />Take advantage of recreation opportunities such as an outdoor pool or take in the view from a rooftop terrace and a garden.</p><p><b>Dining</b> <br />A complimentary continental breakfast is served daily.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and a 24-hour front desk.</p>",
                "amenities": {},
                "original_metadata": {
                    "name": null,
                    "city": "Singapore",
                    "state": null,
                    "country": "SG"
                },
                "image_details": {
                    "suffix": ".jpg",
                    "count": 55,
                    "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/cqqh/"
                },
                "number_of_images": 44,
                "default_image_index": 1,
                "imgix_url": "https://kaligo-web-expedia.imgix.net",
                "cloudflare_image_url": "https://www.kaligo-staging.xyz/images/new",
                "hotelPrice": 296.388509902, "supplierId": "XXXXX" 
            },
        };
        form = {
            firstName: "Tan",
            lastName: "Beng Seng",
            phone: "98684420",
            email: "bengseng@seng.com",
            specialReq: "",
            cardNum: "4569403961014710",
            expiryMonth: 6,
            expiryYear: 24,
            cvv: 152,
            address: "8 Somapah Road"
        }
    })
    it('test getJsonObj()', (initialState) => {
        // create hotel details 
        const hotelDetails = {
            'bookingCreateDate': 1656532146361,
            'bookingKey': "-N5l-dLTOM10TdipkiyX",
            'cancellation': false,
            'location': 'Singapore, Singapore (SIN-Changi)',
            'locationId': 'WD0M',
            'checkIn': 1657136941016,
            'checkOut': 1657223341016,
            'adults':"4",
            'children': "2",
            'rooms': "1",
            'nights': -(1657136941016 - 1657223341016) / 86400000,
            'hotelId': 'cqqh',
            'hotelName': initialStateObj.selectHotelObj.name,
            'hotelAddr': initialStateObj.selectHotelObj.address,
            'hotelPrice': initialStateObj.selectHotelObj.hotelPrice,
            'supplierId': initialStateObj.selectHotelObj.supplierId,
        };
        console.log(typeof form.cardNum);
        let jsonObject = getJsonObj(form, hotelDetails);
        const answer = { "firstName": "Tan", "lastName": "Beng Seng", "phone": "98684420", "email": "bengseng@seng.com", "specialReq": "", "cardNum": "xxxxxxxxxxxx4710", "address": "8 Somapah Road", "bookingCreateDate": 1656532146361, "bookingKey": "-N5l-dLTOM10TdipkiyX", "cancellation": false, "location": "Singapore, Singapore (SIN-Changi)", "locationId": "WD0M", "checkIn": 1657136941016, "checkOut": 1657223341016, "adults": "4", "children": "2", "rooms": "1", "nights": 1, "hotelId": "cqqh", "hotelName": "Lloyd's Inn", "hotelAddr": "2 Lloyd Road", "hotelPrice": 296.388509902, "supplierId": "XXXXX" };
        expect(JSON.stringify(jsonObject)).to.equal(JSON.stringify(answer));
    })
    it('test getReadable',()=>{
        const readable = getReadable("1234567890123456");
        expect(readable).to.equal("1234-5678-9012-3456");
    })

})