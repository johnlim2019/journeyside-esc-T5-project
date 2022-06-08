import SearchWrapper from './SearchItem/SearchWrapper';
import SearchBar from './SearchBar/SearchBar';
import NavBar from './NavBar/NavBar';
import { Center } from '@mantine/core';

function SearchResults() {
    return (
        <>
            <Center>
                <NavBar />
            </Center>
            <div style={{ position: 'sticky', top: 0, zIndex: 2, width: '100%' }}>
                <SearchBar />
            </div>
            <SearchWrapper />
        </>

    );
} export default SearchResults;
