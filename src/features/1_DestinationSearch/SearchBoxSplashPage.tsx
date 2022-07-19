import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect, Loader, AutocompleteItem, Tooltip } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { query, setDestinations } from '../../services/SearchBarSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { PlaneDeparture } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
    searchbarwrapper: {
        width: '50em',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: '80%',
            alignItems: 'center'
        },
    },
    searchbarcomponets: {
        size: 'md',
        width: '100%',        
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

function SearchBarSplashPage(): JSX.Element {
    //get STORE values form input components
    const destinations = useAppSelector(state => state.SearchBarReducer.destinationsObjLs);
    var autoCompleteList = useAppSelector(state => state.SearchBarReducer.autocompleteLs);
    const [date1, date2] = getDefaultDates();
    const [adults, setAdults] = useState(useAppSelector(state => state.SearchBarReducer.adults));
    const [children, setChildren] = useState(useAppSelector(state => state.SearchBarReducer.children));
    const [rooms, setRoom] = useState(useAppSelector(state => state.SearchBarReducer.rooms));
    const [location, setLocation] = useState(useAppSelector(state => state.SearchBarReducer.location));
    const [dates, setDates] = useState<[Date | null, Date | null]>([
        date1, date2
    ]);
    const [isLoading, setIsLoading] = useState(false);
    // flags for inputs 
    const [validDestination, setValidDestination] = useState(true);
    const [validDate, setValidDates] = useState(true);
    const STAYPAGE = "/";
    const NEXTPAGE = "/SearchResults";
    const [nextPage, setNextPage] = useState(STAYPAGE);

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
            setIsLoading(false);
        }).catch(errors => {
            console.error(errors);
            setIsLoading(false);
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

    // check validity upon changes
    useEffect(() => {
        // console.log("HELP DEBOUNCE");
        let validation = validateQuery(dispatchQuery);
        console.log("DEBOUNCE " + validation.length);
        let errorsObj = setErrorMessages(validation);
        setValidDestination(errorsObj['locationValid']);
        setValidDates(errorsObj["dateValid"]);
        if (validation.length === 0) {
            setNextPage(NEXTPAGE);
        } else { setNextPage(STAYPAGE); }
        console.log("DEBOUNCE " + nextPage);
        // eslint-disable-next-line
    }, [dates, location, nextPage]);
    const navigate = useNavigate();


    return (
        <>
            <div>
                <Center>
                    <Paper className={classes.searchbarwrapper} style={{ position: 'absolute' }} withBorder>
                        <Grid columns={16} grow gutter='sm' align='center' p='sm'>
                            <Grid.Col md={8} sm={8} >
                                <Paper>
                                    <Tooltip className={classes.searchbarcomponets} opened={!validDestination} label={NODEST} withArrow position='top'>
                                        <Autocomplete
                                            className={classes.searchbarcomponets}
                                            label="Destination"
                                            placeholder="Begin Your Adventure"
                                            value={location}
                                            onChange={setLocation}
                                            data={autoCompleteList}
                                            error={!validDestination}
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
                            </Grid.Col>
                            <Grid.Col md={8} sm={8}>
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
                                            error={!validDate}
                                        />
                                    </Tooltip>
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
                                    <Button
                                        onClick={() => {
                                            //console.log("HELP querylocation "+dispatchQuery.location);
                                            dispatch(query({ dispatchQuery }));
                                            if (isLoading) {
                                                navigate("/");
                                            }
                                            else {
                                                navigate(nextPage);
                                            }
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
