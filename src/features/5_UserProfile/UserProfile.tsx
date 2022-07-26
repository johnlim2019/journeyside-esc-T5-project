import { Button, Center, createStyles, Dialog, Group, Loader, LoadingOverlay, Modal, Paper, Space, Table, Text, Title, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconFileDescription, IconCircleX, IconCircleCheck } from "@tabler/icons";
import { useAppSelector } from "../../services/hooks";
import axios from "axios";
const userApi = 'http://localhost:3000/api/bookings/';

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
    'address': string,
    'bookingCreateDate': number,
    'booking_reference': string,
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
    'hotelFreeCancel': boolean,
    'hotelBreakfast': boolean,
    'supplierId': string
}
const defaultBooking = {
    "firstName": "",
    'lastName': "",
    'phone': "",
    'email': "",
    'specialReq': "",
    'cardNum': "",
    'address': "",
    'bookingCreateDate': -1,
    'booking_reference': "",
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
    'hotelFreeCancel': false,
    'hotelBreakfast': false,
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
        data.booking_reference,
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
        data.hotelFreeCancel,
        data.hotelBreakfast,
        data.supplierId,
        data.cardNum
    ]
}
function cancelHtml(input: any) {
    if (input === false) {
        return (
            <IconCircleCheck color="green"></IconCircleCheck>
        )
    }
    else {
        return (
            <IconCircleX color="red"></IconCircleX>
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
    const [modal, setModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [currBooking, setCurrBooking] = useState<bookingObject>(defaultBooking);
    const [data, setData] = useState({});
    const [dataArr, setDataArr] = useState<any[]>([]);
    const userId = (useAppSelector(state => state.UserDetailsReducer.userKey));
    const accessToken = useAppSelector(state => state.UserDetailsReducer.sessionKey);
    const [bookings, setBookings] = useState<any[]>([]);


    function parseDataObj(data: object, dataObj: LooseObject) {
        let resultObj = dataObj;
        // console.log(data);
        let bookingIterator = Object.entries(data);
        for (let [key, value] of bookingIterator) {
            console.log(value);
            resultObj[key] = value;
            setData(resultObj);
        }
    }
    function parseDataArr(data: object) {
        let bookingIterator = Object.entries(data);
        let resultArr: any[] = []
        for (let [key, value] of bookingIterator) {
            console.log(key);
            // get the list of booking_references for deletion
            bookings.push(value["booking_reference"]);
            resultArr.push(value);
            console.log(resultArr);
            setDataArr(resultArr);
        }
    }
    const BREAKPOINT = useMantineTheme().breakpoints.sm;
    // check window size
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    // console.log(dataObj);
    useEffect(() => {
        if (userId === "") {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
        const getBookingsApi = async (api: string) => {
            await axios.get(api, { headers: { 'Authorization': accessToken} }
            ).then((response) => {
                let responseData = response.data;
                console.log(responseData);
                let bookingsArr = responseData["bookings"];
                console.log(bookingsArr);
                setDataObj(bookingsArr);
            }).catch(
                () => { console.log("hi"); setDataObj({}); alert("No Service Sorry"); setLoading(false); }
            );
        };
        getBookingsApi(userApi);
    }, [])

    useEffect(() => {
        try {
            parseDataObj(dataObj, data);
            parseDataArr(dataObj);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }, [dataObj])

    // setup table 
    var rowsWide = dataArr.map((element) => (
        <tr key={element.booking_reference}>
            <td>{element.hotelName}</td>
            <td>{new Date(element.bookingCreateDate).toLocaleDateString()}</td>
            <td>{new Date(element.checkIn).toLocaleDateString() + "-" + new Date(element.checkOut).toLocaleDateString()}</td>
            <td>{element.hotelPrice} SGD</td>
            <td>
                <Button onClick={() => {
                    setCurrBooking(element);
                    // console.log(currBooking);
                    // check the if booking is filled
                    setModal(true);
                }}
                ><IconFileDescription></IconFileDescription>
                </Button>
            </td>
            <td className={classes.td}>{cancelHtml(element.cancellation)}</td>
        </tr>
    ));
    var rowsNarrow = dataArr.map((element) => (
        <tr key={element.bookingCreateDate}>
            <td>{element.hotelName}</td>
            <td>{new Date(element.bookingCreateDate).toLocaleDateString()}</td>
            <td>
                <Button onClick={() => {
                    setCurrBooking(element);
                    // console.log(currBooking);
                    // check the if booking is filled
                    setModal(true);
                }}
                ><IconFileDescription></IconFileDescription>
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
        booking_reference,
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
        hotelFreeCancel,
        hotelBreakfast,
        supplierId,
        cardNum
    ] = getBookingDetails(currBooking);
    const navigate = useNavigate();

    return (
        <div className={classes.bookingWrapper}>
            {/* <div>
                <h2>Width: {windowSize.innerWidth}</h2>
                <h2>mobile: {String(windowSize.innerWidth < BREAKPOINT)}</h2>
            </div> */}


            <Modal onClose={() => setDeleteModal(false)} closeOnEscape withCloseButton={false} centered opened={deleteModal}>
                <Paper>
                    <Text>Are You Sure?</Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>You will not be able to recover any data once deleted.</Text>
                    <Space h='sm'></Space>
                    <Center>
                        <Group>
                            <Button color={'red'} onClick={() => {
                                var uniqueBookingReferences = bookings.filter(function (x, i, a) { 
                                    return a.indexOf(x) == i; 
                                });
                                console.log(uniqueBookingReferences);
                                for (let booking of uniqueBookingReferences) {
                                    const deleteBookingsApi = async (api: string) => {
                                        await axios.delete(api + booking,  { headers: { 'Authorization': accessToken}, params: { "booking_reference": booking } }
                                        ).then((response) => {
                                            console.log(response.data);
                                        }).catch(
                                            () => { console.log("hi"); alert("No Service Sorry"); }
                                        );
                                    };
                                    deleteBookingsApi(userApi);
                                }
                                window.location.reload();
                            }}>Burn Baby Burn!</Button>
                            <Button onClick={() => { setDeleteModal(false) }}>Aw Hell No!</Button>
                        </Group>

                    </Center>
                </Paper>
            </Modal>
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
                                <th className={classes.th}>Destination</th>
                                <td className={classes.td}>{location} ({locationId})</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Hotel</th>
                                <td className={classes.td}>{hotelName}, {hotelAddr} ({hotelId})</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Booking ID</th>
                                <td className={classes.td}>{booking_reference}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Number of Nights</th>
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
                                        {rooms}
                                    </Text>
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Breakfast Included</th>
                                <td className={classes.td}>{hotelBreakfast? "Yes": "No"}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Cancellation</th>
                                <td className={classes.td}>{hotelFreeCancel? "Free Cancellation":"With Cancellation Fee"}</td>
                            </tr>                            
                            <tr>
                                <th className={classes.th}>Price</th>
                                <td className={classes.td}>{hotelPrice} SGD</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Card Used</th>
                                <td className={classes.td}>{cardNum}</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Supplier booking response</th>
                                <td className={classes.td}>from the supplier API, see status of booking</td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Status</th>
                                <td className={classes.td}>{cancelHtml(cancellation)}</td>
                            </tr>

                        </tbody>
                    </Table>
                    <Center style={{ marginTop: '1em' }}>
                        <Group >
                            <Button color='red' onClick={() => {
                                let copyCurrBooking = { ...currBooking };
                                copyCurrBooking.cancellation = !copyCurrBooking.cancellation;
                                console.log(copyCurrBooking);
                                const updateBookingsApi = async (api: string) => {
                                    await axios.put(api + currBooking.booking_reference, copyCurrBooking, { headers: { 'Authorization': accessToken}, params: { "booking_reference": currBooking.booking_reference } }
                                    ).then((response) => {
                                        console.log(response.data);
                                    })
                                };
                                updateBookingsApi(userApi);


                                setModal(false);
                                // hard reload page to refresh modal
                                window.location.reload();
                            }}>Cancel Booking</Button>
                            <Button onClick={() => setModal(false)}>Return</Button>
                        </Group>
                    </Center>
                </Paper>
            </Modal>

            {isLoading && <Center style={{
                position: 'absolute',
                height: '100%',
                width: "100%",
                top: 0,
                left: 0
            }}>
                <LoadingOverlay visible={isLoading} />
            </Center>}
            <Paper>
                <Text>User: {userId}</Text>
                {!(windowSize.innerWidth < BREAKPOINT) &&
                    <Table highlightOnHover striped>
                        <thead>
                            <tr>
                                <th className={classes.element}>Hotel Name</th>
                                <th className={classes.element}>Transaction Date</th>
                                <th className={classes.element}>Dates</th>
                                <th className={classes.element}>Price</th>
                                <th className={classes.element}>Details</th>
                                <th className={classes.element}>Status</th>
                            </tr>
                        </thead>
                        <tbody>{rowsWide}</tbody>
                    </Table>}
                {(windowSize.innerWidth < BREAKPOINT) &&
                    <Table highlightOnHover striped horizontalSpacing={'xs'} fontSize={'xs'}>
                        <thead>
                            <tr>
                                <th className={classes.element}>Hotel Name</th>
                                <th className={classes.element}>Transaction Date</th>
                                <th className={classes.element}>Details</th>
                                <th className={classes.element}>Status</th>
                            </tr>
                        </thead>
                        <tbody>{rowsNarrow}</tbody>
                    </Table>}
                {(dataArr.length === 0) && <Paper>
                    <Space h='md'></Space>
                    <Center>
                        <Text>No Bookings on file</Text>
                    </Center>
                    </Paper>}
                {(userId === "") && <Paper>
                    <Center>
                        <Title>Not Logged In</Title>
                    </Center>
                    <Center>
                        <Text>returning to home page...</Text>
                    </Center>
                </Paper>}
                <Space h='lg'></Space>
                <Center>
                    <Button color={'red'} disabled={(userId === "")} onClick={() => {
                        setDeleteModal(true);
                    }}>Delete All Bookings</Button>
                </Center>
            </Paper>
        </div>
    )
}
export default UserProfile;