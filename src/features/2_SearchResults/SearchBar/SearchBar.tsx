import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect, Tooltip, AutocompleteItem, Loader, Notification } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useState, useEffect } from 'react';
import { pageStartLoad, query, setDestinations, compileHotelData, setLoading, pageItemsLoad, setCategory } from '../../../services/SearchBarSlice';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { IconMoodConfuzed, IconPlaneDeparture } from '@tabler/icons';
import axios from 'axios';
const useStyles = createStyles((theme) => ({
  searchbarwrapper: {
    width: '60%',
    margin: 'auto',
    // Media query with value from theme
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: '80%',
      alignItems: 'center'
    },
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

export function getUrlDates(date: Date | null) {
  if (date !== null) {
    return date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate();
  }
  else {
    return null
  }
}
export function validateHotelApiData(data: any[]) {
  try {
    for (let i = 0; i < data.length; i++) {
      let hotel_0 = data[i];
      // check hotel address, name and id and price
      let hotelName: string = hotel_0.name;
      let hotelAddr: string = hotel_0.address;
      let long: number = hotel_0.longitude;
      let lat: number = hotel_0.latitude;
      let id: string = hotel_0.id;
      let distance: number = hotel_0.distance;
      let rating: number = hotel_0.rating;
      let review: number = hotel_0.trustyou.score.kaligo_overall;
      if (typeof hotelName === 'undefined' || typeof hotelAddr === 'undefined' || typeof long === 'undefined' || typeof lat === 'undefined' || typeof id === 'undefined' || typeof distance === 'undefined' || typeof rating === 'undefined' || typeof review === 'undefined') {
        // console.log(i);
        // console.log(hotel_0);
        throw new Error();
      }
    }
    // console.log(data);
    return true;
  } catch (error) {
    return false;
  }
}

export function validatePriceApiData(data: any) {
  try {
    // console.log(data)
    let hotels = data.hotels;
    // console.log(hotels);
    for (let i = 0; i < hotels.length; i++) {
      let hotel_0 = hotels[i]
      // console.log(hotel_0);
      // check hotel address, name and id and price
      let id: string = hotel_0.id;
      let hotelMax: string = hotel_0.coverted_max_cash_payment;
      let hotelPrice: number = hotel_0.converted_price;
      if (typeof id === 'undefined' || typeof hotelMax === 'undefined' || typeof hotelPrice === 'undefined') {
        console.error(hotel_0);
        throw new Error();
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}


function SearchBar(): JSX.Element {
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


  // api caller
  // https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=EzoR&checkin=2022-08-18&checkout=2022-08-19&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1

  // set the api url for axios import function 
  const hotelApi = "https://us-central1-t5-esc-ascendas-hotels.cloudfunctions.net/app/hotels/" + queryId;

  // const hotelApi = "?destination_id=" + queryId
  // const hotelPriceApi = "./prices/" + queryId + ".json";
  var checkIn = getUrlDates(dates[0]);
  var checkOut = getUrlDates(dates[1]);
  const hotelPriceApi = "https://us-central1-t5-esc-ascendas-hotels.cloudfunctions.net/app/hotels-all/prices?destination_id=" + queryId + "&checkin=" + checkIn + "&checkout=" + checkOut + "&lang=en_US&currency=SGD&country_code=SG&guests=" + 2 + "&partner_id=1";
  // https://us-central1-t5-esc-ascendas-hotels.cloudfunctions.net/app/hotels-all/prices?destination_id=vJQX&checkin=2022-08-18&checkout=2022-08-19&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1
  function sendGetRequest(hotelApi: string, hotelPriceApi: string, queryId: string) {
    // axios.defaults.withCredentials = true;
    console.log(hotelPriceApi);
    const hotelApiCall = axios({
      url: hotelApi,
      method: 'GET',
    });
    const hotelPriceApiCall = axios({
      url: hotelPriceApi,
      method: 'GET',
    });
    axios.all([hotelApiCall, hotelPriceApiCall]).then(axios.spread((...responses) => {
      const hotelsData = responses[0].data;
      const hotelPrice = responses[1].data;
      if (!validateHotelApiData(hotelsData)) {
        throw new Error("Corrupted hotel Api data!");
      }
      if (!validatePriceApiData(hotelPrice)) {
        throw new Error("Corrupted Price data");
      }
      console.log("API CALL");
      // console.log(hotelsData);
      // console.log(hotelPrice);
      dispatch(compileHotelData({ hotels: hotelsData, prices: hotelPrice.hotels, id: queryId }));
      dispatch(setLoading({ loading: false }));
    })
    ).catch(errors => {
      console.error(errors);
      console.log(hotelApi);
      console.log(hotelPriceApi);
      dispatch(setLoading({ loading: false }));
      dispatch(compileHotelData({ hotels: [], prices: [], id: queryId }));
    });
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


  // check the cache id and the queryId 
  // load the data from api 
  // else use cache.
  // this is called on once at start of loading page, and to start loading the results 
  useEffect(() => {
    if (queryId.trim() !== cacheId.trim()) {
      dispatch(setLoading({ loading: true }));
      sendGetRequest(hotelApi, hotelPriceApi, queryId);
    }
    // eslint-disable-next-line
  }, []);

  // the following called to check if the query has been changed and we need to reload the results 
  const hotels = useAppSelector(state => state.SearchBarReducer.hotelData.hotels);
  const submitQuery = ()=>{
    let validation = validateQuery(dispatchQuery);
    if (validation.length === 0) {
      // remove any invalid query flags
      setValidDestination(true);
      setValidDates(true);
      if (cacheId !== queryId) { // only reload the query state if it changes.
        dispatch(setLoading({ loading: true }));        
        dispatch(pageStartLoad({ start: 1 })); // reset to page 1 
        sendGetRequest(hotelApi, hotelPriceApi, queryId);
      }
      else if (((checkInDate.getTime() !== dates[0]?.getTime()) || (checkOutDate.getTime() !== dates[1]?.getTime())) && (dates[0] !== null && dates[1] !== null)) {
        dispatch(setLoading({ loading: true }));
        dispatch(pageStartLoad({ start: 1 })); // reset page to 1
        sendGetRequest(hotelApi, hotelPriceApi, queryId);
      }
      if (queryId === undefined || queryId.length === 0) {
        dispatch(setLoading({ loading: false }));
      }
      //console.log("HELP querylocation "+dispatchQuery.location);
      dispatch(query({ dispatchQuery }));// update the state with new search  
    }
    else {
      let errorsObj = setErrorMessages(validation);
      setValidDestination(errorsObj['locationValid']);
      setValidDates(errorsObj["dateValid"]);
    }
  }
  useEffect(submitQuery, [location, dates]);

  return (
    <div className={classes.searchbarwrapper} >
      <Center>
        <Paper shadow='sm' p='xs' radius="md" style={{ width: '100%' }}>
          <Grid grow gutter='xs' align='center' >
            <Grid.Col sm={4}>
              <div className="DestinationInput">
                <Paper>
                  <Tooltip className={classes.searchbarcomponets} opened={!validDestination} label={NODEST} withArrow position='top'>
                    <div className="Autocomplete">
                      <Autocomplete
                        className={classes.searchbarcomponets}
                        label="Destination"                        
                        placeholder="Begin Your Adventure"
                        value={location}
                        onChange={setLocation}
                        onFocus={triggerValidation}
                        data={autoCompleteList}
                        error={(!validDestination) ? "Invalid Destination" : false}
                        filter={(value: string, item: AutocompleteItem) => {
                          if (!value.includes(" ")) {
                            return item.value.replace(",", "").toLowerCase().trim().includes(value.toLowerCase().trim());
                          } else {
                            return item.value.replace(",", "").toLowerCase().trim().startsWith(value.toLowerCase().trim());
                          }
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
            <Grid.Col sm={4}>
              <div className='Date'>
                <Paper>
                  <Tooltip className={classes.searchbarcomponets} opened={!validDate} label={NODATE} withArrow position='bottom'>
                    <div className='dateInput'>
                      <DateRangePicker
                        className={classes.searchbarcomponets}
                        initialMonth={minDate}
                        label="Dates"
                        placeholder="Date range"
                        firstDayOfWeek="sunday"
                        minDate={minDate}
                        onFocus={triggerValidation}
                        value={dates}
                        onChange={setDates}
                        error={!validDate ? "Invalid Date" : false}
                      />
                    </div>
                  </Tooltip>
                </Paper>
                {validDate && <Space h='xl'></Space>}
              </div>
            </Grid.Col>
            <Grid.Col span={1}>
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
                  <Space h='xl'></Space>
                </Paper>
              </div>
            </Grid.Col>
            <Grid.Col span={1}>
              <div className='Kids'>
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
              </div>
            </Grid.Col>
            <Grid.Col span={1}>
              <div className='Rooms'>
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
              </div>
            </Grid.Col>
          </Grid>
        </Paper>
      </Center>
      {
        longHolAlert &&
        <Center>
          <Notification style={{ width: '20rem' }} onClose={() => { setLongHolAlert(false) }} icon={<IconMoodConfuzed size={20} />}>
            Most of our suppliers do not have rooms available for more than {maxDays} days. 
          </Notification>
        </Center>
      }
    </div>
  );
} export default SearchBar;

