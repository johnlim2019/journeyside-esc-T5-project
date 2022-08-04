import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect, Loader, AutocompleteItem, Tooltip, Notification, Title, Text, Divider } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { query, setDestinations } from '../../services/SearchBarSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { IconPlaneDeparture, IconMoodConfuzed } from '@tabler/icons';
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
      width: '90%',
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

export function validateQuery(queryObj: any) {
  // Error codes 
  // empty arr - correct
  // 1 - location error
  // 2 - invalid date 

  let outcome = [];
  // console.log("HELP " + queryObj.id);
  // console.log("HELP " + queryObj.location);
  // console.log("HELP " + queryObj.checkIn);
  // console.log("HELP " + queryObj.checkOut);
  if ((queryObj.location.length === 0) || (queryObj.id.length === 0)) {
    outcome.push(1);
  }
  if ((typeof queryObj.checkIn === 'undefined') || (typeof queryObj.checkOut === 'undefined') || (isNaN(queryObj.checkIn)) ||(isNaN(queryObj.checkOut)) || (queryObj.checkOut === null) || (queryObj.checkOut === null)) {
    outcome.push(2);
  }
  // console.log("HELP" + outcome);
  return outcome;
}
export function setErrorMessages(outcomes: number[]) {
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


export function getDestDetails(location: string, destinations: any) {
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
export function getDefaultDates() {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  let date2 = new Date();
  date2.setDate(date2.getDate() + 8);
  return [date, date2];
}
export function getMinDate() {
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  return minDate;
}

export function SearchBarSplashPage(): JSX.Element {
  //get STORE values form input components
  const destinations = useAppSelector(state => state.SearchBarReducer.destinationsObjLs);
  var autoCompleteList = useAppSelector(state => state.SearchBarReducer.autocompleteLs);
  const [default1, default2] = getDefaultDates();
  var checkInDate = new Date(useAppSelector(state => state.SearchBarReducer.checkIn));
  var checkOutDate = new Date(useAppSelector(state => state.SearchBarReducer.checkOut));
  const [longHolAlert, setLongHolAlert] = useState<boolean>(false);
  if (default1.getTime() - 1000 * 3600 * 24 > checkInDate.getTime()) {
    checkInDate = default1;
    checkOutDate = default2;
  }
  const [adults, setAdults] = useState(useAppSelector(state => state.SearchBarReducer.adults));
  const [children, setChildren] = useState(useAppSelector(state => state.SearchBarReducer.children));
  const [rooms, setRoom] = useState(useAppSelector(state => state.SearchBarReducer.rooms));
  const [location, setLocation] = useState(useAppSelector(state => state.SearchBarReducer.location));
  const [dates, setDates] = useState<[Date | null, Date | null]>([checkInDate, checkOutDate]);
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
    checkIn: dates[0]?.getTime(),
    checkOut: dates[1]?.getTime(),
    adults: adults,
    children: children,
    rooms: rooms,
  }
  if (dispatchQuery.checkIn === undefined || dispatchQuery.checkIn === NaN || dispatchQuery.checkOut === undefined || dispatchQuery.checkOut === NaN){
    
  }


  // trigger the validation 
  const maxDays = 30;
  const triggerValidation = () => {
    let validation = validateQuery(dispatchQuery);
    let errorsObj = setErrorMessages(validation);
    setValidDestination(errorsObj['locationValid']);
    setValidDates(errorsObj["dateValid"]);
    if ((checkOutDate.getTime() - checkInDate.getTime()) / 86400000 > maxDays) {
      setLongHolAlert(true);
    } else {
      setLongHolAlert(false);
    }
  };


  // the following called to check if the query has been changed and we need to reload the results 
  const hotels = useAppSelector(state => state.SearchBarReducer.hotelData.hotels);
  function submitQuery() {
    let validation = validateQuery(dispatchQuery);
    if (validation.length === 0) {
      // remove any invalid query flags
      setValidDestination(true);
      setValidDates(true);
      dispatch(query({ dispatchQuery }));// update the state with new search  
      return true;
    }
    else {
      return false;
    }
  }
  useEffect(()=>{
    submitQuery();
  }, [location, dates]);

  //  the following are different code from the other code in SearchBar.tsx
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Center>
          <Paper radius="lg" shadow="lg" className={classes.searchbarwrapper} style={{ position: 'absolute', padding: '1em' }} withBorder>
            
            <Title align='center' sx={{ fontWeight:300 }}><img width="32" src="./favicon.ico" alt="Logo of Journeyside" />&nbsp; Welcome to <Text inherit sx={{fontWeight:400}} variant='gradient' gradient={{ from: 'orange', to:'yellow', deg: 45 }} component='span'> journeyside</Text>!</Title>
            <Divider m='sm'/>
            <Grid columns={16} grow gutter='sm' align='center' p='sm'>
              <Grid.Col md={8} sm={8}>
                <div className="destinationInput">
                  <Paper>
                    <Tooltip className={classes.searchbarcomponets} opened={!validDestination} label={NODEST} withArrow position='top'>
                      <div className="Autocomplete">
                        <Autocomplete
                          className={classes.searchbarcomponets}
                          label="Destination"
                          placeholder="Begin Your Adventure"
                          value={location}
                          onBlur={triggerValidation}
                          onChange={setLocation}
                          data={autoCompleteList}
                          error={(!validDestination) ? "Invalid Destination" : false}
                          filter={(value: string, item: AutocompleteItem) => {
                            var autocompleteItem = item.value.replace(",", "").toLowerCase().trim();
                            var searchValue = value.replace(/[.,\/#!$%\^@&\*;:{}=\-_`~()\[\]<>\\|+"'?]/g, "").toLowerCase().trim();
                            const regex = new RegExp("(?=.*" + searchValue + ")|^" + searchValue);
                            const regexPresent = regex.test(autocompleteItem);
                            return regexPresent;
                          }}
                          limit={50}
                          maxDropdownHeight='20rem'
                          rightSection={isLoading && <Loader size={'sm'}></Loader>}
                        />
                      </div>
                    </Tooltip>
                  </Paper>
                  {validDestination && <Space h='xl'></Space>}
                </div>
              </Grid.Col>
              <Grid.Col md={8} sm={8}>
                <div className='Date'>
                  <Paper>
                    <Tooltip className={classes.searchbarcomponets} opened={!validDate} label={NODATE} withArrow position='bottom'>
                      <DateRangePicker
                        className={classes.searchbarcomponets}
                        initialMonth={minDate}
                        label="Dates"
                        placeholder="Date range"
                        firstDayOfWeek="sunday"
                        minDate={minDate}
                        value={dates}
                        onChange={setDates}
                        onBlur={triggerValidation}
                        error={!validDate ? "Invalid Date" : false}
                      />
                    </Tooltip>
                  </Paper>
                  {validDate && <Space h='xl'></Space>}
                </div>
              </Grid.Col>
              <Grid.Col span={2}>
                <div className='Adults'>
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
                </div>
              </Grid.Col>
              <Grid.Col span={2}>
                <div className='Kids'>
                  <Paper>
                    <NativeSelect
                      className={classes.searchbarcomponets}
                      data={['0', '1', '2', '3', '4']}
                      value={children}
                      label="Kids"
                      onChange={(event) => setChildren(event.currentTarget.value)}
                    />
                  </Paper>
                </div>
              </Grid.Col>
              <Grid.Col span={2}>
                <div className='Rooms'>
                  <Paper>
                    <NativeSelect
                      className={classes.searchbarcomponets}
                      data={['1', '2', '3']}
                      label='Rooms'
                      value={rooms}
                      onChange={(event) => setRoom(event.currentTarget.value)}
                    />
                  </Paper>
                </div>
              </Grid.Col>
              <Grid.Col span={2}>
                <Space className={classes.searchbarcomponets} h="xl" />
                <Button fullWidth
                  onClick={()=>{
                    const go = submitQuery();
                    if (go){
                      navigate("/SearchResults")
                    }
                  }}>
                  Search &nbsp;
                  <IconPlaneDeparture />
                </Button>
              </Grid.Col>
            </Grid>
          </Paper>
        </Center>        
      </div>
    </>
  );
} export default SearchBarSplashPage;