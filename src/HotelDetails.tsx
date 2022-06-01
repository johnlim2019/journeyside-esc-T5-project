import { Paper, Text,Image, Grid } from '@mantine/core';
import { hotelData } from './hoteldata'; // temporary import of json 
import { hotelPrice } from './hotelPrice';

function HotelDetails() {
    const uid = "diH7";
    let hotel = null;
    for (let i in hotelData) {
        if (i.hasOwnProperty('id')) {
            if (hotelData[i].id === uid) {
                console.log(hotelData[i].id);
                hotel = hotelData[i];
                break;
            }
        }
    }
    let price = [];
    const currency = hotelPrice.currency;
    for (let i in hotelPrice.hotels) {
        if (hotelPrice.hotels[i].hasOwnProperty('id')) {
            //console.log(hotelPrice.hotels[i]);
            if (hotelPrice.hotels[i].id === uid) {
                console.log(hotelPrice.hotels[i].converted_price);
                price.push(hotelPrice.hotels[i].converted_price);
            }
        }
    }
    console.log(hotel);
    console.log(price);
    return (
        <div className='details-container'>
            EMPTY
            </div>
            );
} export default HotelDetails;