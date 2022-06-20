import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useState, useEffect } from 'react';
import { pageStartLoad, query, setDestinations, compileHotelData, setLoading } from '../../services/SearchBarSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { PlaneDeparture } from 'tabler-icons-react';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
    searchbarwrapper: {
        width: '75%',
        margin: 'auto',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
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
function getMinDate() {
    let minDate = new Date();
    minDate.setDate(minDate.getDate() + 7);
    return minDate;
}



function SearchBar(): JSX.Element {

    //get STORE values form input components
    const destinations = useAppSelector(state => state.SearchBarReducer.destinationsObjLs);
    const autoCompleteList = useAppSelector(state => state.SearchBarReducer.autocompleteLs);
    const [date1, date2] = getDefaultDates();
    const [adults, setAdults] = useState(useAppSelector(state => state.SearchBarReducer.adults));
    const [children, setChildren] = useState(useAppSelector(state => state.SearchBarReducer.children));
    const [rooms, setRoom] = useState(useAppSelector(state => state.SearchBarReducer.rooms));
    const [location, setLocation] = useState(useAppSelector(state => state.SearchBarReducer.location));
    const [dates, setDates] = useState<[Date | null, Date | null]>([
        date1, date2
    ]);

    let cacheId = useAppSelector(state => state.SearchBarReducer.hotelData.locationId);
    // console.log("SEARCHBAR DATES");
    // console.log(dates[0]);
    // console.log(dates[1]);

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

    // At the start of the render check if we have destination list read
    useEffect(() => {
        if (autoCompleteList.length < 1) {
            fetchDestApi(destApi);
        }
        // eslint-disable-next-line
    }, []);



    // load styles css
    const { classes } = useStyles();

    // redux dispatch hook
    const dispatch = useAppDispatch(); // to add things to store!!!


    // load destination details
    // eslint-disable-next-line
    let [id, dest, lng, lat] = getDestDetails(location, destinations);
    let queryId = id.toString();


    // set minDate
    let minDate = getMinDate();

    // prepare object of values to be dispatched to store
    let dispatchQuery = {
        id: queryId,
        location: location,
        lng: lng,
        lat: lat,
        checkIn: dates[0],
        checkOut: dates[1],
        adults: adults,
        children: children,
        rooms: rooms,
    }

    // api caller
    // set the api url for axios import function 
    const hotelApi = "./" + queryId + ".json";
    const hotelPriceApi = "https://ascendahotels.mocklab.io/api/destinations/" + queryId + "/prices";
    function sendGetRequest(hotelApi: string, hotelPriceApi: string, queryId: string) {
        const hotelApiCall = axios.get(hotelApi);
        const hotelPriceApiCall = axios.get(hotelPriceApi);
        axios.all([hotelApiCall, hotelPriceApiCall]).then(axios.spread((...responses) => {
            const hotelsData = responses[0].data;
            const hotelPrice = responses[1].data.hotels;
            console.log("API CALL");
            console.log(hotelsData);
            console.log(hotelPrice);
            dispatch(compileHotelData({ hotels: hotelsData, prices: hotelPrice, id: queryId }));
            dispatch(setLoading({ loading: false }));
        })
        ).catch(errors => {
            console.error(errors);
            dispatch(setLoading({ loading: false }));
            dispatch(compileHotelData({ hotels: [], prices: [], id: queryId }));

        });
    }


    // check the cache id and the queryId 
    // load the data from api 
    // else use cache.
    useEffect(() => {
        if (queryId.trim() !== cacheId.trim()) {
            // we need to fetch api data
            dispatch(setLoading({ loading: true }));
            sendGetRequest(hotelApi, hotelPriceApi, queryId);
        }
        // eslint-disable-next-line
    }, []);



    return (
        <div className={classes.searchbarwrapper} >
            <Center>
                <Paper shadow='sm' style={{ width: '100%' }}>
                    <Grid columns={24} grow gutter='sm' align='center' p='sm' >
                        <Grid.Col md={6} sm={4}>
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
                        <Grid.Col md={6} sm={4}>
                            <Paper>
                                <DateRangePicker
                                    className={classes.searchbarcomponets}
                                    label="Dates"
                                    placeholder="Date range"
                                    firstDayOfWeek="sunday"
                                    minDate={minDate}
                                    value={dates}
                                    onChange={setDates}
                                />
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Paper>
                                <NativeSelect
                                    className={classes.searchbarcomponets}
                                    data={['1', '2', '3', '4', '5']}
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
                                    data={['1', '2', '3']}
                                    label='Rooms'
                                    value={rooms}
                                    onChange={(event) => setRoom(event.currentTarget.value)}
                                />
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Space className={classes.searchbarcomponets} h="xl" />
                            <Center>
                                <Button onClick={() => {
                                    console.log("HELP cache " + cacheId)
                                    console.log('HELP query ' + queryId)
                                    if (cacheId !== queryId) { // only reload the query state if it changes.
                                        dispatch(setLoading({ loading: true }));
                                        dispatch(pageStartLoad({ start: 1 }));
                                        sendGetRequest(hotelApi, hotelPriceApi, queryId);
                                    }
                                    if (queryId === undefined || queryId.length === 0){
                                        dispatch(setLoading({ loading: false }));
                                    }  
                                    dispatch(query({ dispatchQuery }));// update the state with new search  
                                    //console.log("HELP querylocation "+dispatchQuery.location);
                                }}>
                                    <PlaneDeparture />
                                </Button>
                            </Center>

                        </Grid.Col>
                    </Grid>
                </Paper>
            </Center>
        </div>



    );
} export default SearchBar;

