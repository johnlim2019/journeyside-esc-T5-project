import NavBar from './NavBarUserProfile';
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
                <NavBar />
            </Center>
            <div>
                <UserProfile></UserProfile>
            </div>
        </>

    );
} export default UserProfileWrapper;
