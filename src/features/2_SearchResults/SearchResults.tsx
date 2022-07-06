import SearchWrapper from './SearchItem/SearchWrapper';
import SearchBar from './SearchBar/SearchBar';
import NavBarSplashPage from '../1_DestinationSearch/NavBarSplashPage';
import { Center, createStyles } from '@mantine/core';

function SearchResults() {
    const useStyles = createStyles((theme) => ({
        searchBarStyle: {
            position: 'sticky', top: 0, zIndex:1, width: '100%',
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                position: 'inherit'
            },
        },

    }));
    // load styles css
    const { classes } = useStyles();
    return (
        <>
            <Center>
                <NavBarSplashPage />
            </Center>
            <Center className={classes.searchBarStyle}>
            <SearchBar />
            </Center>
            <SearchWrapper />
        </>

    );
} export default SearchResults;
