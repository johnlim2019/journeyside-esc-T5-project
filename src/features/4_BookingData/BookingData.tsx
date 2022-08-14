import { Box, Button, Container, createStyles, Grid, InputWrapper, NumberInput, Space, Table, Text, TextInput, Title, Modal, Paper, Center, Group, LoadingOverlay, ThemeIcon } from "@mantine/core";
import { refreshAccessToken, useAppSelector } from "../../services/hooks";
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { isEmoji,isCard,isNotPrinting, isSymbol, isNumber, isEmail, isPhone } from "../../services/regex";
import { IconStar, IconUser, IconCheck } from "@tabler/icons";

const bookingApi = 'https://ascendas-userdata-server.herokuapp.com/api/bookings';

const useStyles = createStyles((theme, _params, getRef) => ({
  th: {
    textAlign: 'left'
  },
  td: {
    border: 'none'
  },
  bookingWrapper: {
    top: '35%',
    width: '60em',
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

}));

export function getJsonObj(form: any, hotelDetails: any) {
  // combine both the hotel details taken form the feature 3 and the form values
  let jsonObj = {};
  if (typeof form !== 'undefined') {
    let form2 = { ...form };
    console.log(form);
    form2.cardNum = `${"x".repeat(12)}` + form2.cardNum.slice(-4);
    delete form2.cvv;
    delete form2.expiryMonth;
    delete form2.expiryYear;
    jsonObj = { ...jsonObj, ...form2 };
  }
  else {
    console.log("getJsonObj form input is undefined");
  }
  if (typeof hotelDetails !== 'undefined') {
    jsonObj = { ...jsonObj, ...hotelDetails };
  }
  else {
    console.log('getJsonObj hotelDetails input is undefined')
  }
  console.log(jsonObj);
  return jsonObj;
}
export function getReadable(cardNum: any) {
  let cardNumReadable = "";
  cardNumReadable += cardNum[0];
  for (let i = 1; i < cardNum.length; i++) {
    if (i % 4 === 0) {
      cardNumReadable += "-";
      cardNumReadable += cardNum[i];
    }
    else {
      cardNumReadable += cardNum[i];
    }
  }
  return cardNumReadable
}

function BookingData() {
  const { classes } = useStyles();

  // pull the data from the query
  const locationId = useAppSelector(state => state.SearchBarReducer.locationId); // to load things from store !!!
  const locationName = useAppSelector(state => state.SearchBarReducer.location);
  const checkIn = useAppSelector(state => state.SearchBarReducer.checkIn);
  const checkOut = useAppSelector(state => state.SearchBarReducer.checkOut);
  const adults = useAppSelector(state => state.SearchBarReducer.adults);
  const children = useAppSelector(state => state.SearchBarReducer.children);
  const rooms = useAppSelector(state => state.SearchBarReducer.rooms);
  const hotelId = useAppSelector(state => state.SearchBarReducer.selectHotelId);
  const hotelObj = useAppSelector(state => state.SearchBarReducer.selectHotelObj);
  const roomObj = useAppSelector(state => state.RoomDetailReducer.selectRoom);
  const nightsNum = (checkOut - checkIn) / 86400000;
  const USERNAME = useAppSelector(state => state.UserDetailsReducer.userKey);

  // setup our data to be pushed to firebase
  // setup our uuid for the booking
  const [newBookingKey,setNewBookingKey] = useState<string>();
  useEffect(()=>{
    setNewBookingKey(uuidv4());
  },[])
  // const db = Firebase();
  // const [newBookingKey, setBookingKey] = useState<null | string>(null);
  // useEffect(() => {
  //   try {
  //     setBookingKey(push(child(ref(db), "data")).key);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [db])

  // Check if we are missing any query values
  const [readyRender, setReadyRender] = useState<Boolean>(false);
  const [isMissingQuery, setIsMissingQuery] = useState<Boolean>(false);
  // set up our booking object attributes
  let hotelName = "";
  let hotelAddr = "";
  let hotelPrice = 0;
  let hotelFreeCancel = false;
  let hotelBreakfast = false;
  let roomString = "(" + rooms + ") " + roomObj.description + " " + (((roomObj.breakfastInfo) === "hotel_detail_breakfast_included") ? "with breakfast" : "") + (((roomObj.breakfastInfo) === "hotel_detail_room_only") ? "room only" : "");
  if (typeof hotelObj !== 'undefined') {
    hotelName = hotelObj.name;
    hotelAddr = hotelObj.address;
  }
  if (typeof roomObj !== 'undefined') {
    hotelPrice = Number((roomObj.price * parseInt(rooms)).toFixed(2));
    hotelFreeCancel = roomObj.free_cancellation;
    hotelBreakfast = ((roomObj.breakfastInfo) === "hotel_detail_breakfast_included");
  }
  useEffect(() => {
    if (hotelName === "" || hotelAddr === "") {
      setIsMissingQuery(true);
    }
    if (roomObj.description === "" || roomObj.type === "" || roomObj.key === "" || roomObj.price === 0) {
      setIsMissingQuery(true);
    }
    setReadyRender(true);
}, [])



// these are constants hard coded in place of the third party services
const supplierId = "alas poor yorick";
const supplierBookingId = "i knew him horatio";
const supplierResponse = {
  "cost": "a man of infinite jest",
  "down_stream_booking_reference": "and most excellent fancy",
  "booking_terms_and_conditions": "he had borne me upon his back a thousand times",
  "hotel_terms_and_conditions": "and here hung the lips that I kissed i know not how oft?"
};
const hotelDetails = {
  'bookingCreateDate': new Date().getTime(),
  'booking_reference': newBookingKey,
  'cancellation': false,
  'location': locationName,
  'locationId': locationId,
  'checkIn': checkIn,
  'checkOut': checkOut,
  'adults': adults,
  'children': children,
  'rooms': roomString,
  'nights': nightsNum,
  'hotelId': hotelId,
  'hotelName': hotelName,
  'hotelAddr': hotelAddr,
  'hotelPrice': hotelPrice,
  'hotelFreeCancel': hotelFreeCancel,
  'hotelBreakfast': hotelBreakfast,
  'supplierId': supplierId,
  'supplierBookingId': supplierBookingId,
  'supplierResponse': supplierResponse
}

// check if we have completed the form and can leave the page safely.
// form builder and validation.
interface FormValues {
  salutation: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  specialReq: string,
  cardNum: string,
  expiryMonth: number,
  expiryYear: number,
  cvv: number,
  address: string
}
const form = useForm<FormValues>({
  initialValues: {
    salutation: "M",
    firstName: "Tan",
    lastName: "Beng Seng",
    phone: "98684420",
    email: "bengseng@seng.com",
    specialReq: "",
    cardNum: "4569403961014710",
    expiryMonth: 6,
    expiryYear: 24,
    cvv: 152,
    address: "8 Somapah Road"
  },
  validate: (values) => ({
    // regex validation
    salutation: (values.salutation.length < 1 || values.salutation.length > 9 || values.salutation.match(isEmoji) || values.salutation.match(isNotPrinting) || values.salutation.match(isSymbol) || values.salutation.match(isNumber) ? "Invalid Salutation" : null),
    firstName: (values.firstName.length < 1 || values.firstName.length > 30 || values.firstName.match(isEmoji) || values.firstName.match(isNotPrinting) || values.firstName.match(isSymbol) || values.firstName.match(isNumber)? "Please Enter Valid First Name" : null),
    lastName: (values.lastName.length < 1 || values.lastName.length > 30 || values.lastName.match(isEmoji) || values.lastName.match(isNotPrinting) || values.lastName.match(isSymbol) || values.lastName.match(isNumber)? "Please Enter Valid Last Name" : null),
    specialReq: ( values.specialReq.length > 1250 || values.specialReq.replace(/[\s]+/, "").length > 250 ? "250 Words Max" : values.specialReq.match(isEmoji) || values.specialReq.match(isNotPrinting) ? "Invalid Character Detected" : null),
    email: (isEmail.test(values.email) || values.email.length > 35 ? null : 'Invalid email'),
    cardNum: (values.cardNum.match(isCard) ? null : "Invalid Card"),
    phone: (isPhone.test(values.phone) ? null : "Invalid Phone Number"),
    expiryMonth: (new Date(String(values.expiryMonth) + "/1/20" + String(values.expiryYear)).getTime() > new Date().getTime() ? null : "Expired Card?"),
    expiryYear: (new Date(String(values.expiryMonth) + "/1/20" + String(values.expiryYear)).getTime() > new Date().getTime() ? null : "Expired Card?"),
    address: (values.address.length < 1 || values.address.length > 1250 || values.address.match(isEmoji) || values.address.match(isNotPrinting) ? "Please Enter Valid Address" : null),
  })
});

// Set expiry date from our two inputs
const cardNum = form.getInputProps('cardNum').value;
const cardNumReadable: string = getReadable(cardNum)

const [modal, setModal] = useState(false);
const [isLoading, setIsLoading] = useState(false);
// instead of using html links, we can use javascript to go to different pages.
const navigate = useNavigate();
const accessToken = useAppSelector(state => state.UserDetailsReducer.sessionKey);


return (
  <Container mt={20}>
    {isLoading && <Center style={{
      position: 'absolute',
      height: '100%',
      width: "100%",
      top: 0,
      left: 0
    }}>
      <LoadingOverlay visible={isLoading} />
    </Center>}
    <Modal onClose={() => setModal(false)} closeOnEscape withCloseButton={false} centered={true} opened={modal}>
      <Paper>
        <Center pb="lg">
          <Title order={3}>Confirm your booking?</Title>
        </Center>
        <div className="confirmModal">
          <Group position="center">
            <Button size='md' color='red' onClick={() => setModal(false)}>Hold on!</Button>
            <Button size='md' onClick={() => {
              // attempt to refresh token then send post request
              refreshAccessToken();
              console.log("push booking");
              // writeEncryptedJson(db, "testUser", "Test message");
              setIsLoading(true);
              let jsonObj = getJsonObj(form.values, hotelDetails);
              console.log(jsonObj);
              // let [publicKey, privateKey] = generateKeys(db);
              // writeKey(db, privateKey, "keys/private/" + USERNAME + "/" + newBookingKey + "/");
              // writeEncryptedJson(db, String(USERNAME), jsonObj, newBookingKey + "/", publicKey); 
              const postBookingApi = async (api: string) => {
                await axios.post(api, jsonObj, { headers: { 'Authorization': accessToken } }
                ).then((response) => {
                  const data = response.data as object[];
                  console.log(data);
                  navigate("/SearchResults");
                }).catch(errors => {
                  console.error(errors);
                  alert("failed to book just now");
                });
              };
              postBookingApi(bookingApi);
              setIsLoading(false);
            }}>Confirm</Button>
          </Group>
        </div>
      </Paper>
    </Modal>
    {readyRender && <div>
      {!isMissingQuery && <div className={classes.bookingWrapper}>
        <Title order={2}>Booking Data</Title>
        <Space h="md" />
        <Title order={3}> <ThemeIcon radius="lg" variant="light" mr="xs"><IconStar size={16}/></ThemeIcon>Summary</Title>
        <Space h="xs" />
        <Text>Please check your booking data.</Text>
        <Space h="sm" />
        <Paper shadow="md" p="sm" radius="md" withBorder>
          <Table highlightOnHover>
            <tbody>
              <tr>
                <th className={classes.th}>Destination ID</th>
                <td className={classes.td}>{locationName} ({locationId})</td>
              </tr>
              <tr>
                <th className={classes.th}>Hotel ID</th>
                <td className={classes.td}>{hotelName}, {hotelAddr} ({hotelId})</td>
              </tr>
              <tr>
                <th className={classes.th}>Number of Night</th>
                <td className={classes.td}>
                  <Text size='sm'>
                    {nightsNum} Night(s)
                  </Text>
                </td>
              </tr>
              <tr>
                <th className={classes.th}>Check In</th>
                <td className={classes.td}>
                  <Text size='sm'>
                    {new Date(checkIn).toLocaleDateString()}
                  </Text>
                </td>
              </tr>
              <tr>
                <th className={classes.th}>Check Out</th>
                <td className={classes.td}>
                  <Text size='sm'>
                    {new Date(checkOut).toLocaleDateString()}
                  </Text>
                </td>
              </tr>
              <tr>
                <th className={classes.th}>Number Guests</th>
                <td className={classes.td}>
                  <Text size='sm'>
                    Adults: {adults}, Children: {children}
                  </Text>
                </td>
              </tr>
              <tr>
                <th className={classes.th}>Rooms</th>
                <td className={classes.td}>
                  <Text size='sm'>
                    {roomString}
                  </Text>
                </td>
              </tr>
              <tr>
                <th className={classes.th}>Price</th>
                <td className={classes.td}>{hotelPrice} SGD</td>
              </tr>
              <tr>
                <th className={classes.th}>Booking ID</th>
                <td className={classes.td}>{newBookingKey}</td>
              </tr>
            </tbody>
          </Table>
        </Paper>
        
        <Space h={32} />
        <Title order={3}><ThemeIcon radius="lg" variant="light" mr="xs"><IconUser size={16}/></ThemeIcon>Please fill in your personal information</Title>
        { USERNAME && <><Space h='xs'></Space><Text>User: {USERNAME}</Text></>}
        <Space h='sm'></Space>
        <Paper shadow="md" p="sm" radius="md" withBorder>
          <form onSubmit={form.onSubmit((values) => { })}>
            <Grid>
              <Grid.Col xs={4} sm={4}>
                <TextInput className="salutation" label="Salutation" onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}} required {...form.getInputProps('salutation')} />
              </Grid.Col>
              <Grid.Col xs={8} sm={4}>
                <TextInput className="firstName" label="First name" required {...form.getInputProps('firstName')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
              </Grid.Col>
              <Grid.Col xs={8} sm={4}>
                <TextInput className="lastName" label="Last name" required {...form.getInputProps('lastName')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput className="phone" label="Phone Number" required {...form.getInputProps('phone')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput className='email' label="Email" required {...form.getInputProps('email')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
              </Grid.Col>
              <Grid.Col xs={12}>
                <TextInput className="specialReq" label="Special requests to hotel" {...form.getInputProps('specialReq')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput className="cardNum" label="Credit Card Number" required {...form.getInputProps('cardNum')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
                <Text size="sm" style={{ marginLeft: '12px', marginTop: '5px' }}>{cardNumReadable}</Text>
              </Grid.Col>
              <Grid.Col xs={8} sm={4}>
                <InputWrapper label="Expiry Date" required>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <NumberInput className="expiryMonth" min={1} max={12} hideControls sx={{ flex: 1 }} {...form.getInputProps('expiryMonth')} placeholder="MM" onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
                    <Text style={{ marginLeft: '1em', marginRight: '1em' }}> / </Text>
                    <NumberInput className='expiryYear' min={0} max={99} hideControls sx={{ flex: 1 }} {...form.getInputProps('expiryYear')} placeholder="YY" onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
                  </Box>
                </InputWrapper>
              </Grid.Col>
              <Grid.Col xs={4} sm={2}>
                <NumberInput className="cvv" min={0} max={999} label="CVV/CVC" hideControls required {...form.getInputProps('cvv')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
              </Grid.Col>
              <Grid.Col xs={12}>
                <TextInput className='address' label="Billing Address" required {...form.getInputProps('address')} onBlur={()=>{form.validate()}} onFocus={()=>{form.validate()}}/>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Center className="submitBtn">
                  <Button m='md' rightIcon={<IconCheck/>}
                    type="submit" onClick={() => {
                      form.validate();
                      if (USERNAME === "") {
                        alert("Please login to place your booking");
                      }
                      else {
                        if (form.validate().hasErrors === false) {
                          setModal(true);
                          let jsonObj = getJsonObj(form.values, hotelDetails);
                          console.log(jsonObj);
                        }
                        else {
                          console.log("error in form");
                          console.log(form.validate());
                        }
                      }
                    }}>Submit</Button>
                </Center>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
        <Space h={32}></Space>
      </div>}
      {isMissingQuery && <Paper>
        <Center>
          <Title>We could not find your last session</Title>
        </Center>
        <Center>
          <Text>returning to home page...</Text>
        </Center>
      </Paper>}
    </div>}
  </Container >
);
}

export default BookingData;