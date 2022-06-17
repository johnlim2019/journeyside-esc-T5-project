import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect, Image } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { query, setDestinations } from '../services/SearchBarSlice';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { PlaneDeparture } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
    searchbarwrapper: {
        top: '35%',
        width: '50em',
        marginLeft: 'auto',
        marginRight: 'auto',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: '50em',
            alignItems: 'center'
        },        
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: '100%',
            alignItems: 'center'
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

function getDestDetails(location: string, destinations: any) {
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
    return [id, dest, lng, lat];
}
function getDefaultDates() {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let date2 = new Date();
    date2.setDate(date.getDate() + 1);
    return [date, date2];
}

function SearchBarSplashPage(): JSX.Element {
    // load destinations
    const fetchDestApi = async (api: string) => {
        await axios({
            url: api,
            method: 'GET',
            headers: { "Access-Control-Allow-Origin": "*" }
        }).then((response) => {
            // do what u want with the response here
            //console.log(response.data);
            const data = response.data as object[];
            dispatch(setDestinations({ dest: data }));
        });
    };
    const destApi = './destinations.json';

    useEffect(()=>{
        fetchDestApi(destApi);
        // eslint-disable-next-line
    },[]);
    // get auto complete
    const destinations = useAppSelector(state=>state.SearchBarReducer.destinationsObjLs);
    const autoCompleteList = useAppSelector(state=>state.SearchBarReducer.autocompleteLs);
    // redux dispatch hook
    const dispatch = useAppDispatch(); // to add things to store!!!

    // get location from input
    const [location, setLocation] = useState("");
    // load destination details
    let [id, dest, lng, lat] = getDestDetails(location, destinations);

    // load dates
    let [date, date2] = getDefaultDates();

    const [dates, setDates] = useState<[Date | null, Date | null]>([
        date,
        date2
    ]);
    //get other values form input components
    const [adults, setAdults] = useState("2");
    const [children, setChildren] = useState("0");
    const [rooms, setRoom] = useState("1");
    const { classes } = useStyles();

    // prepare object of values to be dispatched to store
    let dispatchQuery = {
        id: id,
        location: dest,
        lng: lng,
        lat: lat,
        checkIn: dates[0],
        checkOut: dates[1],
        adults: adults,
        children: children,
        rooms: rooms,
    }

    
    return (
        <>
        <Image radius='lg' style={{position:'relative', width:'45%',marginLeft:'auto',marginRight:'auto',marginTop:'5em'}} src='./sandBeach.jpg' />
        <div>
            <Center>
                <Paper className={classes.searchbarwrapper} style={{position:'absolute'}} withBorder>
                    <Grid columns={16} grow gutter='sm' align='center' p='sm' >
                        <Grid.Col md={8} sm={8} >
                            <Paper>
                                <Autocomplete
                                    className={classes.searchbarcomponets}
                                    label="Destination"
                                    placeholder="Begin Your Adventure"
                                    value={location}
                                    onChange={setLocation}
                                    data={autoCompleteList}
                                />
                            </Paper>
                        </Grid.Col>
                        <Grid.Col md={8} sm={8}>
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
                                    data={['1', '2', '3', '4','5']}
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
                                    data={['1', '2','3']}
                                    label='Rooms'
                                    value={rooms}
                                    onChange={(event) => setRoom(event.currentTarget.value)}
                                />
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Space className={classes.searchbarcomponets} h="xl" />
                            <Center>
                                <Button component={Link} to='/SearchResults' onClick={() => {
                                    dispatch(query({ dispatchQuery }));
                                }}>
                                    <PlaneDeparture />
                                </Button>
                            </Center>

                        </Grid.Col>
                    </Grid>
                </Paper>
            </Center>
        </div>
    </>
    );
} export default SearchBarSplashPage;

