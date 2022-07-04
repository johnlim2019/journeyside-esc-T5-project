import { Button, Center, createStyles, Group, LoadingOverlay, Modal, Paper, Table, Text } from "@mantine/core";
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
const defaultBooking = {
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





function getBookingDetails(data: bookingObject) {
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
        border: 'none',
    },
    element: {
        zIndex: 5
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
    const [currBooking, setCurrBooking] = useState<bookingObject>(defaultBooking);
    const [data, setData] = useState({});
    const [dataArr, setDataArr] = useState<any[]>([]);


    function parseDataObj(data: object, dataObj: LooseObject) {
        let resultObj = dataObj;
        console.log(data);
        let bookingIterator = Object.entries(data);
        for (let [key, value] of bookingIterator) {
            value = readEncryptedJson(db, userId, key).then(
                (value) => {
                    resultObj[key] = value;
                    setData(resultObj);
                }
            ).catch(
                () => { resultObj = {}; alert("No Service Sorry"); setLoading(false); }
            );
        }
    }
    function parseDataArr(data: object) {
        let bookingIterator = Object.entries(data);
        let resultArr:any[] = []
        for (let [key, value] of bookingIterator) {
            value = readEncryptedJson(db, userId, key).then(
                (value) => {
                    console.log(value);
                    resultArr.push(value);
                    console.log(resultArr);
                    setDataArr(resultArr);
                    setLoading(false);
                }
            ).catch(
                () => { setDataArr([]); alert("No Service Sorry"); setLoading(false); }
            );
        }
    }

    // console.log(dataObj);
    useEffect(() => {
        readEncryptedBookings(db, userId, "booking/").then(async (result) => {
            setDataObj(result);
            console.log(result);
        });
    }, [])

    useEffect(() => {
        parseDataObj(dataObj, data);
        parseDataArr(dataObj);
    }, [dataObj])
    console.log(dataArr);
    console.log(data)

    // setup table 
    var rows = dataArr.map((element) => (
        <tr key={element.firstName}>
            <td>{new Date(element.checkIn).toLocaleDateString()}</td>
            <td>{new Date(element.checkOut).toLocaleDateString()}</td>
            <td>{new Date(element.bookingCreateDate).toLocaleDateString()}</td>
            <td>{element.hotelName}</td>
            <td>{element.hotelPrice.toFixed(2)} SGD</td>
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

    useEffect(() => {
        rows = dataArr.map((element) => (
            <tr key={element.firstName}>
                <td>{new Date(element.checkIn).toLocaleDateString()}</td>
                <td>{new Date(element.checkOut).toLocaleDateString()}</td>
                <td>{new Date(element.bookingCreateDate).toLocaleDateString()}</td>
                <td>{element.hotelName}</td>
                <td>{element.hotelPrice}</td>
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
    })



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
                                copyCurrBooking.cancellation = !copyCurrBooking.cancellation;
                                setCurrBooking(copyCurrBooking);
                                // push curr booking
                                updateEncryptedJson(db, userId, copyCurrBooking, copyCurrBooking["bookingKey"] + "/");
                                setModal(false);
                                // hard reload page to refresh modal
                                window.location.reload();
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
                            <th className={classes.element}>Check In</th>
                            <th className={classes.element}>Check Out</th>
                            <th className={classes.element}>Transaction Date</th>
                            <th className={classes.element}>Hotel Name</th>
                            <th className={classes.element}>Price</th>
                            <th className={classes.element}>Details</th>
                            <th className={classes.element}>Status</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Paper>
        </div>
    )
}
export default UserProfile;