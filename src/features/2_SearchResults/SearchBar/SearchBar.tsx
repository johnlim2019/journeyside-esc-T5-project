import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect, Tooltip, AutocompleteItem, Loader } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useState, useEffect } from 'react';
import { pageStartLoad, query, setDestinations, compileHotelData, setLoading, setHotelData } from '../../../services/SearchBarSlice';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
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
        width: '100%',
        size: 'md',
        zIndex: 5,
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            size: 'xs'
        },
    },
}));

const NODEST = "Please enter a destination."
const NODATE = "Please enter a date."
function validateQuery(queryObj: any) {
    // Error codes 
    // empty arr - correct
    // 1 - location error
    // 2 - invalid date 

    let outcome = [];
    console.log("HELP " + queryObj.id);
    console.log("HELP " + queryObj.location);
    console.log("HELP " + queryObj.checkIn);
    console.log("HELP " + queryObj.checkOut);
    if ((queryObj.location.length === 0) || (queryObj.id.length === 0)) {
        outcome.push(1);
    }
    if ((queryObj.checkIn === null) || (queryObj.checkOut === null)) {
        outcome.push(2);
    }
    console.log("HELP" + outcome);
    return outcome;
}
function setErrorMessages(outcomes: number[]) {
    let output = {
        "locationValid": true,
        "dateValid": true
    };
    for (let i = 0; i < outcomes.length; i++) {
        if (outcomes[i] === 1) {
            output['locationValid'] = false;
        }
        if (outcomes[i] === 2) {
            output['dateValid'] = false;
        }
    }
    return output;
}


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
    date2.setDate(date2.getDate() + 8);
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
    var autoCompleteList = useAppSelector(state => state.SearchBarReducer.autocompleteLs);
    const [default1, default2] = getDefaultDates();
    const checkInDate = new Date(useAppSelector(state => state.SearchBarReducer.checkIn));
    const checkOutDate = new Date(useAppSelector(state => state.SearchBarReducer.checkOut));
    var [date1, date2] = [default1, default2];
    if (default1.getTime() < checkInDate.getTime()) {
        date1 = checkInDate;
        date2 = checkOutDate;
    }
    const [adults, setAdults] = useState(useAppSelector(state => state.SearchBarReducer.adults));
    const [children, setChildren] = useState(useAppSelector(state => state.SearchBarReducer.children));
    const [rooms, setRoom] = useState(useAppSelector(state => state.SearchBarReducer.rooms));
    const [location, setLocation] = useState(useAppSelector(state => state.SearchBarReducer.location));
    const [dates, setDates] = useState<[Date | null, Date | null]>([date1, date2]);
    // flags for inputs 
    const [validDestination, setValidDestination] = useState(true);
    const [validDate, setValidDates] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


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
            setIsLoading(false);
            const data = response.data as object[];
            dispatch(setDestinations({ dest: data }));
        }).catch(errors => {
            setIsLoading(false);
            console.error(errors);
            dispatch(setDestinations({ dest: [] }));

        });
    };
    const destApi = './destinations.json';

    // At the start of the render check if we have destination list read
    useEffect(() => {
        if (autoCompleteList.length < 1) {
            setIsLoading(true);
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
    const hotelPriceApi = "./prices/" + queryId + ".json";
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
            dispatch(compileHotelData({ hotels: [], prices: [], id: "No" }));
        });
    }

    // check validity upon changes
    useEffect(() => {
        let validation = validateQuery(dispatchQuery);
        if (validation.length === 0) {
            dispatch(query({ dispatchQuery }));// update the state with new search  
            // remove any invalid query flags
            setValidDestination(true);
            setValidDates(true);
            if (cacheId !== queryId) { // only reload the query state if it changes.
                dispatch(setLoading({ loading: true }));
                dispatch(pageStartLoad({ start: 1 }));
                sendGetRequest(hotelApi, hotelPriceApi, queryId);
            }
            if (queryId === undefined || queryId.length === 0) {
                dispatch(setLoading({ loading: false }));
            }
            //console.log("HELP querylocation "+dispatchQuery.location);
        }
        else {
            let errorsObj = setErrorMessages(validation);
            setValidDestination(errorsObj['locationValid']);
            setValidDates(errorsObj["dateValid"]);
        }
        // eslint-disable-next-line
    }, [dates, location, dispatchQuery]);


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
                            <div className='destination'>
                                <Paper>
                                    <Tooltip className={classes.searchbarcomponets} opened={!validDestination} label={NODEST} withArrow position='top'>
                                        <Autocomplete
                                            className={classes.searchbarcomponets}
                                            label="Destination"
                                            placeholder="Begin Your Adventure"
                                            value={location}
                                            onChange={setLocation}
                                            data={autoCompleteList}
                                            error={(!validDestination) ? "Invalid Destination" : false}
                                            filter={(value: string, item: AutocompleteItem) => {
                                                if (!value.includes(" ")) {
                                                    return item.value.replace(",", "").toLowerCase().trim().includes(value.toLowerCase().trim());
                                                } else {
                                                    return item.value.replace(",", "").toLowerCase().trim().startsWith(value.toLowerCase().trim());
                                                }
                                            }}
                                            limit={8}
                                            rightSection={isLoading && <Loader size={'sm'}></Loader>}
                                        />
                                    </Tooltip>
                                </Paper>
                                {validDestination && <Space h='xl'></Space>}
                            </div>
                        </Grid.Col>
                        <Grid.Col md={6} sm={4}>
                            <div className='dates'>
                                <Paper>
                                    <Tooltip className={classes.searchbarcomponets} opened={!validDate} label={NODATE} withArrow position='bottom'>
                                        <DateRangePicker
                                            className={classes.searchbarcomponets}
                                            label="Dates"
                                            placeholder="Date range"
                                            firstDayOfWeek="sunday"
                                            minDate={minDate}
                                            value={dates}
                                            onChange={setDates}
                                            error={!validDate ? "Invalid Date" : false}
                                        />
                                    </Tooltip>
                                </Paper>
                                {validDate && <Space h='xl'></Space>}
                            </div>
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
                                <Space h='xl'></Space>
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
                                <Space h='xl'></Space>
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
                                <Space h='xl'></Space>
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Space className={classes.searchbarcomponets} h="xl" />
                            <Center>
                                <Button fullWidth onClick={() => {
                                    // console.log("HELP cache " + cacheId)
                                    // console.log('HELP query ' + queryId)
                                    let validation = validateQuery(dispatchQuery);
                                    if (validation.length === 0) {
                                        dispatch(query({ dispatchQuery }));// update the state with new search  
                                        // remove any invalid query flags
                                        setValidDestination(true);
                                        setValidDates(true);
                                        if (cacheId !== queryId) { // only reload the query state if it changes.
                                            dispatch(setLoading({ loading: true }));
                                            dispatch(pageStartLoad({ start: 1 }));
                                            sendGetRequest(hotelApi, hotelPriceApi, queryId);
                                        }
                                        if (queryId === undefined || queryId.length === 0) {
                                            dispatch(setLoading({ loading: false }));
                                        }
                                        //console.log("HELP querylocation "+dispatchQuery.location);
                                    }
                                    else {
                                        let errorsObj = setErrorMessages(validation);
                                        setValidDestination(errorsObj['locationValid']);
                                        setValidDates(errorsObj["dateValid"]);
                                    }
                                }}>
                                    <PlaneDeparture />
                                </Button>
                            </Center>
                            <Space h='xl'></Space>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Center>
        </div>



    );
} export default SearchBar;

