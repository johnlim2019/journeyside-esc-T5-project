import { Paper, Image, Text, Badge, Button, Group, useMantineTheme, Progress } from '@mantine/core';
import { hotelData } from './hoteldata' // temporary import of json 
import { hotelPrice } from './HotelPrice'

function HotelDetails(){
    const uid = "diH7";
    let hotel = null;
    for (let i in hotelData){
        if (hotelData[0].hasOwnProperty('id')){
            if (hotelData[i].id == uid){
                console.log(hotelData[i].id);
                hotel = hotelData[i];
                break;
            }
        }
    }
    console.log(hotel);
    return (
        <div className='details-container'>
            <Paper shadow='xs'>hfsdkjfhgdffjsgfkhfkjdsfhsdjfs</Paper>
        </div>
    )

} export default HotelDetails;