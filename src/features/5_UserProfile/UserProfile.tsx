import { Button, Center, createStyles, Group, LoadingOverlay, Modal, Paper, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { FileDescription } from "tabler-icons-react";
import { readEncryptedJson } from "../../services/Firebase-Functions";
import { Firebase } from "../../services/Firebase-Storage";

interface LooseObject {
    [key: string]: any
}
interface bookingObject {
    "firstName": string,
    'lastName': string,
    'phone': string,
    'email': string,
    'specialReq': string,
    'cardNum': string,
    'expiryMonth': number,
    'expiryYear': number,
    'cvv': number,
    'address': string,
    'bookingCreateDate': number,
    'bookingKey': string,
    'location': string,
    'locationId': string,
    'checkIn': number,
    'checkOut': number,
    'adults': number,
    'children': number,
    'rooms': number,
    'nights': number,
    'hotelId': string,
    'hotelName': string,
    'hotelAddr': string,
    'hotelPrice': number,
    'supplierId': string
}

function parseDataObj(data: object) {
    let bookingIterator = Object.entries(data);
    let resultObj: LooseObject = {};
    for (let [key, value] of bookingIterator) {
        console.log(key);
        resultObj[key] = JSON.parse(value);
    }
    return resultObj;
}
function parseDataArr(data: object) {
    let bookingIterator = Object.entries(data);
    let resultArr = [];
    for (let [key, value] of bookingIterator) {
        console.log(key);
        resultArr.push(JSON.parse(value));
    }
    return resultArr;
}
function getBookingDetails(data: bookingObject) {
    console.log(data);
    return [
        data.firstName,
        data.lastName,
        data.phone,
        data.email,
        data.specialReq,
        data.address,
        data.bookingCreateDate,
        data.bookingKey,
        data.location,
        data.locationId,
        data.checkIn,
        data.checkOut,
        data.adults,
        data.children,
        data.rooms,
        data.nights,
        data.hotelId,
        data.hotelName,
        data.hotelAddr,
        data.hotelPrice.toFixed(2),
        data.supplierId,]
}

const useStyles = createStyles((theme) => ({
    bookingWrapper: {
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
    modalText: {
        fontSize: '0.9em',
        color: 'gray',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    th: {
        textAlign: 'left'
    },
    td: {
        border: 'none'
    }
}));
function UserProfile() {
    // set up the style classes
    // load styles css
    const { classes } = useStyles();
    // set up the firebase connection and prepare the object data
    const userId = "notjohnlim";
    const db = Firebase();
    const [dataObj, setDataObj] = useState<object>({});
    const [isLoading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false)
    const [currBooking, setCurrBooking] = useState<bookingObject>(
        {
            "firstName": "",
            'lastName': "",
            'phone': "",
            'email': "",
            'specialReq': "",
            'cardNum': "",
            'expiryMonth': -1,
            'expiryYear': -1,
            'cvv': -1,
            'address': "",
            'bookingCreateDate': -1,
            'bookingKey': "",
            'location': "",
            'locationId': "",
            'checkIn': -1,
            'checkOut': -1,
            'adults': -1,
            'children': -1,
            'rooms': -1,
            'nights': -1,
            'hotelId': "",
            'hotelName': "",
            'hotelAddr': "",
            'hotelPrice': -1,
            'supplierId': ""
        }
    );
    useEffect(() => {
        try {
            setLoading(true);
            let data = readEncryptedJson(db, userId, "booking");
            setDataObj(data);
            setLoading(false);
        } catch (error) {
            // console.error(error);
        }
    }, [dataObj]);

    var data = {};
    var dataArr = []
    if (typeof dataObj !== 'undefined') {
        data = parseDataObj(dataObj);
        dataArr = parseDataArr(dataObj);
    }
    // console.log(data);

    // setup table 
    const rows = dataArr.map((element) => (
        <tr key={element.name}>
            <td>{new Date(element.checkIn).toLocaleDateString()}</td>
            <td>{new Date(element.bookingCreateDate).toLocaleDateString()}</td>
            <td>{element.hotelName}</td>
            <td>{element.hotelPrice.toFixed(2)}</td>
            <td>
                <Button onClick={() => {
                    setCurrBooking(element);
                    console.log(currBooking);
                    // check the if booking is filled
                    setModal(true);
                }}
                ><FileDescription></FileDescription>
                </Button>
            </td>
        </tr>
    ));

    // set up details of current object 
    const [
        firstName,
        lastName,
        phone,
        email,
        specialReq,
        address,
        bookingCreateDate,
        bookingKey, location,
        locationId,
        checkIn,
        checkOut,
        adults,
        children,
        rooms,
        nights,
        hotelId,
        hotelName,
        hotelAddr,
        hotelPrice,
        supplierId,
    ] = getBookingDetails(currBooking);


    return (
        <div className={classes.bookingWrapper}>
            <Modal onClose={() => setModal(false)} closeOnEscape withCloseButton={false} centered opened={modal}>
                <Paper>
                    <Table highlightOnHover striped>
                        <tbody>
                            <tr>
                                <th className={classes.th}>Customer</th>
                                <td className={classes.td}>{firstName}, {lastName}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Contact Details</th>
                                <td className={classes.td}>{phone}, {email}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Billing Address</th>
                                <td className={classes.td}>{address}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Placed On</th>
                                <td className={classes.td}>{new Date(bookingCreateDate).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Special Requests</th>
                                <td className={classes.td}>{specialReq}</td>
                            </tr>

                            <tr>
                                <th className={classes.th}>Price</th>
                                <td className={classes.td}>{hotelPrice} SGD</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Destination</th>
                                <td className={classes.td}>{location} ({locationId})</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Hotel</th>
                                <td className={classes.td}>{hotelName}, {hotelAddr} ({hotelId})</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Booking ID</th>
                                <td className={classes.td}>{bookingKey}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Number of Night</th>
                                <td className={classes.td}>
                                    <Text size='sm'>
                                        {nights} Night(s)
                                    </Text>
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Dates</th>
                                <td className={classes.td}>
                                    <Text size='sm'>
                                        {new Date(checkIn).toLocaleDateString()} to {new Date(checkOut).toLocaleDateString()}
                                    </Text>
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Guests</th>
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
                                <td className={classes.td}>{hotelPrice} SGD</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Supplier booking response</th>
                                <td className={classes.td}>from the supplier API, see status of booking</td>
                            </tr>

                        </tbody>
                    </Table>
                    <Center style={{ marginTop: '1em' }}>
                        <Group >
                            <Button color='red' onClick={() => alert("Goto to supplier website to cancel")}>Cancel Booking</Button>
                            <Button onClick={() => setModal(false)}>Return</Button>
                        </Group>
                    </Center>
                </Paper>
            </Modal>

            <Center style={{
                position: 'absolute',
                height: '100%',
                width: "100%",
                top: 0,
                left: 0
            }}>
                <LoadingOverlay visible={isLoading} />
            </Center>
            <Paper>
                <Text>User: {userId}</Text>
                <Table highlightOnHover striped>
                    <thead>
                        <tr>
                            <th>Check In</th>
                            <th>Transaction Dae</th>
                            <th>Hotel Name</th>
                            <th>Price</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Paper>
        </div>
    )
}
export default UserProfile;