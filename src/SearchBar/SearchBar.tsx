import { createStyles, Autocomplete, Button, Space, NativeSelect, Grid, Paper, Center } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useState } from 'react';
import { query } from './SearchBarSlice';
import { useAppDispatch } from '../hooks';
import { destinations } from '../data/destinations';
import { hotelDataLoad } from '../SearchBar/SearchBarSlice';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
    searchbarwrapper: {
        width: '75%',
        margin: 'auto',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: '100%',
            alignItems:'center'
        },
    },
    searchbarcomponets: {
        size: 'md',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            size: 'xs'
        },
    },
}));


function SearchBar(): JSX.Element {
    // redux dispatch hook
    const dispatch = useAppDispatch(); // to add things to store!!!
    const [location, setLocation] = useState("");
    console.log("location: "+location);
    // load the destination details
    let id = "";
    let dest = "";
    let lng = 0;
    let lat = 0;
    for (let i of destinations) {
        if (i.term === location) {
            id = i.uid;
            dest = i.term;
            lng = i.lng;
            lat = i.lat;
        }
    }
    console.log("id");
    console.log(id);
    

    // load dates, num of adults,children,rooms
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let dateUTC = date.getUTCMilliseconds();
    let date2 = new Date();
    date2.setDate(date.getDate() + 1);
    let date2UTC = date.getUTCMilliseconds();
    const [dates, setDates] = useState<[Date | null, Date | null]>([
        date,
        date2
    ]);
    const [adults, setAdults] = useState('');
    const [children, setChildren] = useState('');
    const [rooms, setRoom] = useState('');
    const { classes } = useStyles();

    // prepare all values to be dispatched to store
    let dispatchQuery = {
        id: id,
        location: dest,
        lng: lng,
        lat: lat,
        checkIn: dateUTC,
        checkOut: date2UTC,
        adults: adults,
        children: children,
        rooms: rooms,
    }
    const fetchHotelApi = async (api: string) => {
        await axios({
          url: api,
          method: 'GET',
          //headers: {"Access-Control-Allow-Origin": "*"}
        }).then((response) => {
          // do what u want with the response here
          console.log(response.data);
          const data = response.data;
          dispatch(hotelDataLoad({ hotelData: data }));
          return;
        });
      };
      const hotelApi = "./"+id+".json";

    return (
        <div className={classes.searchbarwrapper} >
            <Center>
            <Paper shadow='sm'>
                <Grid columns={16} grow gutter='sm' align='center' p='md' >
                    <Grid.Col span={4}>
                        <Paper>
                            <Autocomplete
                                className={classes.searchbarcomponets}
                                label="Destination"
                                placeholder="Begin Your Adventure"
                                value={location}
                                onChange={setLocation}
                                data={["Paris, France", "Istanbul, Turkey", "Singapore, Singapore", "Kuala Lumpur, Malaysia"]}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Paper>
                            <DateRangePicker
                                className={classes.searchbarcomponets}
                                label="Dates"
                                placeholder="Date range"
                                firstDayOfWeek="sunday"
                                minDate={date}
                                value={dates}
                                onChange={setDates}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Paper>
                            <NativeSelect
                                className={classes.searchbarcomponets}
                                data={['1', '2', '3', '4']}
                                placeholder="2"
                                label="Adults"
                                value={adults}
                                onChange={(event) => setAdults(event.currentTarget.value)}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Paper>
                            <NativeSelect
                                className={classes.searchbarcomponets}
                                data={['0', '1', '2', '3', '4']}
                                value={children}
                                label="Kids"
                                onChange={(event) => setChildren(event.currentTarget.value)}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Paper>
                            <NativeSelect
                                className={classes.searchbarcomponets}
                                data={['1', '2']}
                                label='Rooms'
                                value={rooms}
                                onChange={(event) => setRoom(event.currentTarget.value)}
                            />
                        </Paper>

                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Space className={classes.searchbarcomponets} h="xl" />
                        <Button fullWidth={true} onClick={() =>{
                            dispatch(query({ dispatchQuery }));
                            fetchHotelApi(hotelApi);                            
                            }}>GO!</Button>
                    </Grid.Col>
                </Grid>
            </Paper>
            </Center>

        </div>



    );
} export default SearchBar;

