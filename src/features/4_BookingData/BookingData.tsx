import { Box, Button, Container, createStyles, Grid, InputWrapper, NumberInput, Space, Table, Text, TextInput, Title, Modal, Paper, Center, Group, LoadingOverlay } from "@mantine/core";
import { useAppSelector } from "../../services/hooks";
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { Firebase } from '../../services/Firebase-Storage';
import { writeEncryptedJson, writeKey } from "../../services/Firebase-Functions";
import { Link } from "react-router-dom";
import { ref, child, push } from "firebase/database";
import { generateKeys } from "../../services/Encryption";


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
    let form2 = { ...form.values};
    console.log(form2);
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
  const db = Firebase();
  const [newBookingKey, setBookingKey] = useState<null | string>(null);
  useEffect(() => {
    try {
      setBookingKey(push(child(ref(db), "data")).key);
    } catch (error) {
      console.error(error);
    }
  }, [db])

  // set up our booking object attributes
  let hotelName = "";
  let hotelAddr = "";
  let hotelPrice = 0;
  let hotelFreeCancel = false;
  let hotelBreakfast = false;
  let roomString = rooms + " "+ roomObj.description + " "+ (((roomObj.breakfastInfo) === "hotel_detail_breakfast_included") ? "with breakfast":"") + (((roomObj.breakfastInfo) === "hotel_detail_room_only") ? "room only":"") ;
  if (typeof hotelObj !== 'undefined') {
    hotelName = hotelObj.name;
    hotelAddr = hotelObj.address;
    hotelPrice = hotelObj.converted_price;
  }
  if (typeof roomObj !== 'undefined') {
    hotelPrice = Number((roomObj.price * parseInt(rooms)).toFixed(2));
    hotelFreeCancel = roomObj.free_cancellation;
    hotelBreakfast = ((roomObj.breakfastInfo) === "hotel_detail_breakfast_included");
  }
  const supplierId = "XXXXX";
  const supplierResponse = "XXXXX";
  const hotelDetails = {
    'bookingCreateDate': new Date().getTime(),
    'bookingKey': newBookingKey,
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
    'hotelFreeCancel':hotelFreeCancel,
    'hotelBreakfast':hotelBreakfast,
    'supplierId': supplierId,
  }


  // check if we have completed the form and can leave the page safely.
  // form builder and validation.
  const form = useForm({
    initialValues: {
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
      firstName: (values.firstName.length > 1 ? null : "Please Enter First Name"),
      lastName: (values.lastName.length > 1 ? null : "Please Enter Last Name"),
      email: (/^\S+@\w+\.\w{2,7}$/.test(values.email) ? null : 'Invalid email'),
      cardNum: (/(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/.test(values.cardNum) ? null : "Invalid Card"),
      phone: (/(^[6,8,9]{1}[0-9]{7})$/.test(values.phone) ? null : "Invalid Phone Number"),
      expiryMonth: (new Date(String(values.expiryMonth) + "/1/20" + String(values.expiryYear)).getTime() > new Date().getTime() ? null : "Expired Card?"),
      expiryYear: (new Date(String(values.expiryMonth) + "/1/20" + String(values.expiryYear)).getTime() > new Date().getTime() ? null : "Expired Card?"),
    })
  });

  // Set expiry date from our two inputs
  const cardNum = form.getInputProps('cardNum').value;
  const cardNumReadable: string = getReadable(cardNum)

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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
          <Center style={{ padding: '0em 0em 2em 0em' }}>
            <Text>Confirm your booking?</Text>
          </Center>
          <div className="confirmModal">
            <Group position="apart">
              <Button color='red' onClick={() => setModal(false)}>Hold on!</Button>
              <Button component={Link} to={"/SearchResults"} onClick={() => {
                console.log("push booking");
                // writeEncryptedJson(db, "testUser", "Test message");
                setIsLoading(true);
                let jsonObj = getJsonObj(form, hotelDetails);
                let [publicKey, privateKey] = generateKeys(db);
                writeKey(db, privateKey, "keys/private/" + USERNAME + "/" + newBookingKey + "/");
                writeEncryptedJson(db, String(USERNAME), jsonObj, newBookingKey + "/", publicKey);
              }}>Confirm</Button>
            </Group>
          </div>
        </Paper>
      </Modal>
      <div className={classes.bookingWrapper}>
        <Title order={2}>Booking Data</Title>
        <Space h="md" />
        <Title order={3}>Summary</Title>
        <Text>Please check your booking data.</Text>
        <Space h="sm" />
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
            <tr>
              <th className={classes.th}>Supplier booking response</th>
              <td className={classes.td}>{supplierResponse}</td>
            </tr>
          </tbody>
        </Table>
        <Space h="lg" />
        <Title order={3}>Please fill in your personal information</Title>
        <Text>User: {USERNAME}</Text>
        <Space h='md'></Space>
        <form onSubmit={form.onSubmit((values) => { })}>
          <Grid>
            <Grid.Col xs={12} sm={6}>
              <TextInput className="firstName" label="First name" required {...form.getInputProps('firstName')} />
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <TextInput className="lastName" label="Last name" required {...form.getInputProps('lastName')} />
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <TextInput className="phone" label="Phone Number" required {...form.getInputProps('phone')} />
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <TextInput className='email' label="Email" required {...form.getInputProps('email')} />
            </Grid.Col>
            <Grid.Col xs={12}>
              <TextInput className="specialReq" label="Special requests to hotel" {...form.getInputProps('specialReq')} />
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <TextInput className="cardNum" label="Credit Card Number" required {...form.getInputProps('cardNum')} />
              <Text size="sm" style={{ marginLeft: '12px', marginTop: '5px' }}>{cardNumReadable}</Text>
            </Grid.Col>
            <Grid.Col xs={8} sm={4}>
              <InputWrapper label="Expiry Date" required>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <NumberInput className="expiryMonth" min={1} max={12} hideControls sx={{ flex: 1 }} {...form.getInputProps('expiryMonth')} placeholder="MM" />
                  <Text style={{ marginLeft: '1em', marginRight: '1em' }}> / </Text>
                  <NumberInput className='expiryYear' min={0} max={99} hideControls sx={{ flex: 1 }} {...form.getInputProps('expiryYear')} placeholder="YY" />
                </Box>
              </InputWrapper>
            </Grid.Col>
            <Grid.Col xs={4} sm={2}>
              <NumberInput className="cvv" min={0} max={999} label="CVV/CVC" hideControls required {...form.getInputProps('cvv')} />
            </Grid.Col>
            <Grid.Col xs={12}>
              <TextInput className='address' label="Billing Address" required {...form.getInputProps('address')} />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Center className="submitBtn">
                <Button
                  type="submit" onClick={() => {
                    form.validate();
                    if (USERNAME === "") {
                      alert("Pls Login To Place Booking");
                    }
                    else {
                      if (form.validate().hasErrors === false) {
                        setModal(true);
                        let jsonObj = getJsonObj(form, hotelDetails);
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
      </div>
    </Container >
  );
}

export default BookingData;