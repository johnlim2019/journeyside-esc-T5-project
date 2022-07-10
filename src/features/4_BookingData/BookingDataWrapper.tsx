import NavBarSplashPage from '../1_DestinationSearch/NavBarSplashPage';
import BookingData from './BookingData';
import { createStyles } from '@mantine/core';

function BookingDataWrapper() {
    const useStyles = createStyles((theme) => ({
        navbar: {
            position: 'sticky', top: 0,zIndex:10, width: '100%',
        },
    }));
    // load styles css
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.navbar}>
                <NavBarSplashPage />
            </div>
            <BookingData></BookingData>
        </>

    );
} export default BookingDataWrapper;