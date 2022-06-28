import { Box, Button, Container, createStyles, Grid, InputWrapper, NumberInput, Space, Table, Text, TextInput, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { userMakesBooking } from "./BookingExample";

const useStyles = createStyles((theme, _params, getRef) => ({
  th: {
    textAlign:'left'
  },
  td: {
    border:'none'
  }
}));

function BookingData() {
    const { classes } = useStyles();
    userMakesBooking();
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
              <td className={classes.td}>XXXXX</td>
            </tr>
            <tr>
              <th className={classes.th}>Hotel ID</th>
              <td className={classes.td}>XXXXX</td>
            </tr>
            <tr>
              <th className={classes.th}>Booking display information</th>
              <td className={classes.td}>Number of nights, start date, end date, adults, children, message to hotel, room types</td>
            </tr>
            <tr>
              <th className={classes.th}>Price</th>
              <td className={classes.td}>-</td>
            </tr>
            <tr>
              <th className={classes.th}>Supplier booking ID</th>
              <td className={classes.td}>XXXXX</td>
            </tr>
            <tr>
              <th className={classes.th}>Supplier booking response</th>
              <td className={classes.td}>XXXXX</td>
            </tr>
            <tr>
              <th className={classes.th}>Booking reference</th>
              <td className={classes.td}>XXXXX</td>
            </tr>
          </tbody>
        </Table>
        <Space h="lg" />
        <Title order={3}>Please fill in your personal information</Title>
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="First name" required />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="Last name" required />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <NumberInput label="Phone Number" hideControls required />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="Email" required />
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextInput label="Special requests to hotel" />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <NumberInput label="Credit Card Number" hideControls required />
          </Grid.Col>
          <Grid.Col xs={8} sm={4}>
            <InputWrapper label="Expiry Date" required>
              <Box  sx={{display:"flex", alignItems:"center"}}>
                <NumberInput min={1} max={12} hideControls sx={{flex:1}} placeholder="MM" />
                <span>&nbsp; / &nbsp;</span>
                <NumberInput min={22} max={99}  hideControls sx={{flex:1}} placeholder="YY" />
              </Box>
            </InputWrapper>
          </Grid.Col>
          <Grid.Col xs={4} sm={2}>
            <NumberInput max={999} label="CVV/CVC" hideControls required />
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextInput label="Billing Address" required/>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Button fullWidth component={Link} to="/">Submit</Button>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }
  
export default BookingData;