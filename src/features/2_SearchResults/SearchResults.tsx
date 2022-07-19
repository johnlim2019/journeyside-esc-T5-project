import SearchWrapper from './SearchItem/SearchWrapper';
import SearchBar from './SearchBar/SearchBar';
import NavBarSplashPage from '../1_DestinationSearch/NavBarSplashPage';
import { Button, Center, createStyles, ThemeIcon } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'tabler-icons-react';

function SearchResults() {
    const useStyles = createStyles((theme) => ({
        searchBarStyle: {
            position: 'sticky', top: '0', zIndex: 1, width: '100%',
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                position: 'inherit'
            },
        },
        navbar: {
            position: 'inherit', top: 0, zIndex: 10, width: '100%',
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                position: 'sticky'
            },
        },
        gototop: {
            position: 'sticky', top: '90%', zIndex: 10, width: '100%',margin:"1em",
        }
    }));
    // load styles css
    const { classes } = useStyles();

    // get scroll postion
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={classes.navbar}>
                <NavBarSplashPage />
            </div>
            <Center className={classes.searchBarStyle}>
                <SearchBar />
            </Center>
            {(scrollPosition > 500) && <div className={classes.gototop}>
                <ThemeIcon variant="filled" color="blue" radius="xl" size='xl'
                style={{cursor:'pointer'}}
                onClick={() => {
                    
                    window.scrollTo({top:0,behavior: 'smooth'});
                }}
                ><ChevronUp></ChevronUp></ThemeIcon>
            </div>}
            <SearchWrapper />
        </>

    );
} export default SearchResults;
