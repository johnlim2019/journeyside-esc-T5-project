import { createStyles } from '@mantine/core';
import NavBarSplashPage from '../1_DestinationSearch/NavBarSplashPage';
import UserProfile from './UserProfile';

function UserProfileWrapper() {
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
            <UserProfile />
        </>

    );
} export default UserProfileWrapper;
