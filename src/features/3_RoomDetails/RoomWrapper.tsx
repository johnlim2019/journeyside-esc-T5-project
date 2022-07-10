import RoomDetails from './RoomDetails';
import NavBarSplashPage from '../1_DestinationSearch/NavBarSplashPage';
import { createStyles } from '@mantine/core';

function RoomWrapper() {
    const useStyles = createStyles((theme) => ({
        roomDetails: {
            width: '75%',
            marginLeft: 'auto',
            marginRight: 'auto',
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                width: '100%',
            },
        },
        navbar: {
            position: 'sticky', top: 0,zIndex:10, width: '100%',
        },

    }));
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.navbar}>
                <NavBarSplashPage />
            </div>
            <div className={classes.roomDetails}>
                <RoomDetails />
            </div>

        </>

    );
} export default RoomWrapper;