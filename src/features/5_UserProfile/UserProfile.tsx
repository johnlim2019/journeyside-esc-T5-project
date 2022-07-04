import { Button, Center, createStyles, Group, LoadingOverlay, Modal, Paper, Table, Text } from "@mantine/core";
import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { FileDescription, CircleX, CircleCheck } from "tabler-icons-react";
import { readEncryptedBookings, readEncryptedJson, updateEncryptedJson, writeEncryptedJson } from "../../services/Firebase-Functions";
import { Firebase } from "../../services/Firebase-Storage";

const userId = "integrationTest";
const db = Firebase();

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
    'cancellation': boolean,
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

// function parseDataObj(data: object) {
//     let bookingIterator = Object.entries(data);
//     let resultObj: LooseObject = {};
//     for (let [key, value] of bookingIterator) {
//         console.log(key);
//         resultObj[key] = JSON.parse(value);
//     }
//     return resultObj;
// }

// function parseDataArr(data: object) {
//     let bookingIterator = Object.entries(data);
//     let resultArr = [];
//     for (let [key, value] of bookingIterator) {
//         console.log(key);
//         resultArr.push(JSON.parse(value));
//     }
//     return resultArr;
// }

function parseDataObj(data: object) {
    console.log(data);
    let bookingIterator = Object.entries(data);
    let resultObj: LooseObject = {};
    for (let [key, value] of bookingIterator) {
        console.log(key);
        value = readEncryptedJson(db, userId, key);
        console.log(value);
        resultObj[key] = value;
    }
    return resultObj;
}

function parseDataArr(data: object) {
    let bookingIterator = Object.entries(data);
    let resultArr = [];
    for (let [key, value] of bookingIterator) {
        console.log(key);
        value = readEncryptedJson(db, userId, key);
        console.log(value);
        resultArr.push(value);
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
        new Date(data.bookingCreateDate).toLocaleDateString(),
        data.bookingKey,
        data.cancellation,
        data.location,
        data.locationId,
        new Date(data.checkIn).toLocaleDateString(),
        new Date(data.checkOut).toLocaleDateString(),
        data.adults,
        data.children,
        data.rooms,
        data.nights,
        data.hotelId,
        data.hotelName,
        data.hotelAddr,
        data.hotelPrice.toFixed(2),
        data.supplierId,
    ]
}
function cancelHtml(input: any) {
    if (input === false) {
        return (
            <CircleCheck color="green"></CircleCheck>
        )
    }
    else {
        return (
            <CircleX color="red"></CircleX>
        )
    }
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
    const [dataObj, setDataObj] = useState<object>({});
    const [isLoading, setLoading] = useState<boolean>(true);
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
            'cancellation': false,
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
    // let data2 = readOnceEncryptedJson(db, userId, "booking");
    // setDataObj(data2);
    // setLoading(false);
    // var data = {};
    // useEffect(() => {
    //     try {
    //         let data = readEncryptedBookings(db, userId, "booking/");
    //         setDataObj(data);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     wait(500);
    // });



    var data = {};
    var dataArr = []
    if (typeof dataObj !== "undefined") {
        console.log("test");
        data = parseDataObj(dataObj);
        dataArr = parseDataArr(dataObj);
    }
    // console.log(dataObj);
    useEffect(() => {
        readEncryptedBookings(db, userId, "booking/").then(async (result) => {
            setDataObj(result);
            if (typeof dataObj !== "undefined") {
                console.log("test");
                data = parseDataObj(dataObj);
                dataArr = parseDataArr(dataObj);
                // setDataObj(data);
                console.log(dataObj);
                setLoading(false);
            }
        });
    }, [])
    // console.log(data);

    // setup table 
    const rows = dataArr.map((element) => (
        <tr key={element.name}>
            <td>{new Date(element.checkIn).toLocaleDateString()}</td>
            <td>{new Date(element.checkOut).toLocaleDateString()}</td>
            <td>{new Date(element.bookingCreateDate).toLocaleDateString()}</td>
            <td>{element.hotelName}</td>
            <td>{element.hotelPrice.toFixed(2)}</td>
            <td>
                <Button onClick={() => {
                    setCurrBooking(element);
                    // console.log(currBooking);
                    // check the if booking is filled
                    setModal(true);
                }}
                ><FileDescription></FileDescription>
                </Button>
            </td>
            <td className={classes.td}>{cancelHtml(element.cancellation)}</td>
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
        bookingKey,
        cancellation,
        location,
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
                    <Table highlightOnHover={true} striped>
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
                                <td className={classes.td}>{bookingCreateDate}</td>
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
                                        {checkIn} to {checkOut}
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
                            <tr>
                                <th className={classes.th}>Status</th>
                                <td className={classes.td}>{cancelHtml(currBooking.cancellation)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Center style={{ marginTop: '1em' }}>
                        <Group >
                            <Button color='red' onClick={() => {
                                let copyCurrBooking = { ...currBooking };
                                copyCurrBooking.cancellation = true;
                                setCurrBooking(copyCurrBooking);
                                // push curr booking
                                updateEncryptedJson(db, userId, copyCurrBooking, "booking/" + currBooking.bookingKey + "/");
                                setModal(false);
                            }}>Cancel Booking</Button>
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
                            <th>Check Out</th>
                            <th>Transaction Date</th>
                            <th>Hotel Name</th>
                            <th>Price</th>
                            <th>Details</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Paper>
        </div>
    )
}
export default UserProfile;