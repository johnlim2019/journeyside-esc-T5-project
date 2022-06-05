import { createStyles, Autocomplete, Text, Button, Space, NativeSelect, Grid, Paper } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useState } from 'react';
import { query} from './SearchBarSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import {destinations} from '../data/destinations';


const useStyles = createStyles((theme) => ({
    searchbarwrapper: {
        width: '75%',
        padding: '0 0 0 5px',
        margin: 'auto',
        marginBottom: '1em',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: '100%'
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
    let id = "";
    let dest ="";
    let lng = 0;
    let lat = 0;
    

    for (let i of destinations){
        if (i.term === location){
            id = i.uid;
            dest = i.term;
            lng = i.lng;
            lat = i.lat;
        }}
    console.log("id")
    console.log(id);



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

    let dispatchQuery = {
        id : id,
        location : dest,
        lng : lng,
        lat : lat,
        checkIn: dateUTC,
        checkOut: date2UTC,
        adults:adults,
        children:children,
        rooms:rooms,
    }

    return (

        <div className={classes.searchbarwrapper} >
            <Paper shadow='sm'>
                <Grid columns={18} grow gutter='sm' align='center' p='md' >
                    <Grid.Col span={4}>
                        <Paper>
                            <Autocomplete
                                className={classes.searchbarcomponets}
                                label="Destination"
                                placeholder="Begin Your Adventure"
                                value = {location}
                                onChange={setLocation}
                                data={["Paris, France","Istanbul, Turkey","Singapore, Singapore"]}
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
                                onChange = {(event) => setRoom(event.currentTarget.value)}
                            />
                        </Paper>

                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Space className={classes.searchbarcomponets} h="xl" />
                        <Button fullWidth={true} onClick={()=> dispatch(query({dispatchQuery}))}>GO!</Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </div>



    );
} export default SearchBar;

