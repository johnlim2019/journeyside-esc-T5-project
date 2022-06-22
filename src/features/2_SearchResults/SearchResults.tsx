import SearchWrapper from './SearchItem/SearchWrapper';
import SearchBar from './SearchBar/SearchBar';
import NavBar from './NavBar';
import { Center, createStyles } from '@mantine/core';

function SearchResults() {
    const useStyles = createStyles((theme) => ({
        searchBarStyle: {
            position: 'sticky', top: 0, zIndex: 2, width: '100%',
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
                <NavBar />
            </Center>
            <div className={classes.searchBarStyle}>
                <SearchBar />
            </div>
            <SearchWrapper />
        </>

    );
} export default SearchResults;
