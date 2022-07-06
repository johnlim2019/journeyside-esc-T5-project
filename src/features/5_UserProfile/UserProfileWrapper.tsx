import NavBarSplashPage from '../1_DestinationSearch/NavBarSplashPage';
import UserProfile from './UserProfile';
import { Center, createStyles } from '@mantine/core';

function UserProfileWrapper() {
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
                <UserProfile></UserProfile>
            </div>
        </>

    );
} export default UserProfileWrapper;
