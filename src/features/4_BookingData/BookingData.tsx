import { Box, Button, Container, createStyles, Grid, InputWrapper, NumberInput, Space, Table, Text, TextInput, Title } from "@mantine/core";
import { useAppSelector } from "../../services/hooks";
import { useForm } from '@mantine/form';
import { useEffect } from "react";
import { Firebase } from '../../services/Firebase-Storage';
import { writeEncryptedJson, readEncryptedJson } from "../../services/Firebase-Functions";

const useStyles = createStyles((theme, _params, getRef) => ({
  th: {
    textAlign: 'left'
  },
  td: {
    border: 'none'
  }
}));

function getReadable(cardNum:any){
  let cardNumReadable = "";
  cardNumReadable += cardNum[0];
  for (let i=1;i<cardNum.length;i++){
    if (i%4 === 0){
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
  const nightsNum = (checkOut - checkIn) / 86400000;

  let hotelName = "";
  let hotelAddr = "";
  let hotelPrice = 0;
  let supplierBookingId = "";
  let supplierBookingResponse = "";
  if (typeof hotelObj !== 'undefined') {
    hotelName = hotelObj.name;
    hotelAddr = hotelObj.address;
    hotelPrice = hotelObj.converted_price;
  }


  const bookingReference = "XXXXX";
  const supplierId = "XXXXX";
  const supplierResponse = "XXXXX";

  const form = useForm({
    initialValues: {
      firstName: "Tan",
      lastName: "Beng Seng",
      phone: "98684420",
      email: "bengseng@",
      specialReq: "",
      cardNum: "4569403961014710",
      expiryMonth: 6,
      expiryYear: 22,
      expiryDate: new Date().getTime(),
      cvv: 152,
      address: "8 Somapah Road"
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
      cardNum: (value) => (/(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/.test(value) ? null : "invalid card"),
      phone: (value) => (/(?:[6,8,9][0-9]{7})/.test(value) ? null : "Invalid Phone Number"),
      expiryDate: (value) => (value > new Date().getTime() + 2629800000 ? null : "Expired Card?")
    }
  });

  const expiryDateString = "1/" + form.getInputProps("expiryMonth").value + "/" + form.getInputProps('expiryYear').value;
  const expiryDate = new Date(expiryDateString).getTime();
  const cardNum = form.getInputProps('cardNum').value;
  const cardNumReadable:string = getReadable(cardNum)
  
  // Set expiry date
  useEffect(() => {
    form.setFieldValue('expiryDate', expiryDate);
    // console.log("HELP "+activePage);
  }, [expiryDate]);
  // console.log(new Date(form.getInputProps('expiryDate').value));
  // TO  GET JSON VALUES JUST CALL forms.values yeah!
  console.log(form.values);
  const db = Firebase();
  writeEncryptedJson(db, "testUser", "Test message");
  console.log(readEncryptedJson(db, "testUser"));

  
  return (
    <Container mt={20}>
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
                {rooms} Room(s)
              </Text>
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Price</th>
            <td className={classes.td}>{hotelPrice.toFixed(2)} SGD</td>
          </tr>
          <tr>
            <th className={classes.th}>Supplier booking ID</th>
            <td className={classes.td}>{supplierId}</td>
          </tr>
          <tr>
            <th className={classes.th}>Supplier booking response</th>
            <td className={classes.td}>{supplierResponse}</td>
          </tr>
          <tr>
            <th className={classes.th}>Booking reference</th>
            <td className={classes.td}>{bookingReference}</td>
          </tr>
        </tbody>
      </Table>
      <Space h="lg" />
      <Title order={3}>Please fill in your personal information</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="First name" required {...form.getInputProps('firstName')} />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="Last name" required {...form.getInputProps('lastName')} />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="Phone Number" required {...form.getInputProps('phone')} />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="Email" required {...form.getInputProps('email')} />
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextInput label="Special requests to hotel" />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="Credit Card Number" required {...form.getInputProps('cardNum')} />
            <Text size="sm" style={{marginLeft:'12px',marginTop:'5px'}}>{cardNumReadable}</Text>
          </Grid.Col>
          <Grid.Col xs={8} sm={4}>
            <InputWrapper label="Expiry Date" required>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <NumberInput min={1} max={12} hideControls sx={{ flex: 1 }} {...form.getInputProps('expiryMonth')} placeholder="MM" />
                <Text style={{ marginLeft: '1em', marginRight: '1em' }}> / </Text>
                <NumberInput min={22} max={99} hideControls sx={{ flex: 1 }} {...form.getInputProps('expiryYear')} placeholder="YY" />
              </Box>
            </InputWrapper>
          </Grid.Col>
          <Grid.Col xs={4} sm={2}>
            <NumberInput max={999} label="CVV/CVC" hideControls required {...form.getInputProps('cvv')} />
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextInput label="Billing Address" required {...form.getInputProps('address')} />
          </Grid.Col>
          <Grid.Col xs={12}>
            <Button fullWidth type="submit">Submit</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}

export default BookingData;