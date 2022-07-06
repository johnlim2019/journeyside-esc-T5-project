import NavBarSplashPage from '../1_DestinationSearch/NavBarSplashPage';
import BookingData from './BookingData';
import { Center, createStyles } from '@mantine/core';

function BookingDataWrapper() {
    const useStyles = createStyles((theme) => ({
        navbarStyle: {
             zIndex: 2, width: '100%',
        },
    }));
    // load styles css
    const { classes } = useStyles();
    return (
        <>
            <Center className={classes.navbarStyle}>
                <NavBarSplashPage/>
            </Center>
            <div>
                <BookingData></BookingData>
            </div>
        </>

    );
} export default BookingDataWrapper;