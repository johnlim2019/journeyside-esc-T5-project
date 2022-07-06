import SearchBox from './SearchBoxSplashPage';
import NavBarSplashPage from './NavBarSplashPage';
import { createStyles } from '@mantine/core';

function SplashPage() {
    const useStyles = createStyles((theme) => ({
        searchBox: {
            position: 'fixed'
        }
    }));
    const { classes } = useStyles();
    return (
        <>
            <NavBarSplashPage />
            <div className={classes.searchBox}>
                <SearchBox />
            </div>
        </>

    );
} export default SplashPage;
