import SearchBox from './SearchBoxSplashPage';
import NavBarSplashPage from './NavBarSplashPage';
import { Center, createStyles, Image } from '@mantine/core';
import { useEffect, useState } from 'react';

const SplashPage = () => {
    const useStyles = createStyles((theme) => ({
        backgroundImage: {
            top: '20%',
            width: '45%',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'fixed',
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                top: '20%',
                width: '90%',

            },
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                top: '15%',
                width: '90%',
            },
        },
        searchbar: {
            top: '25em',
            position: 'relative',
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                top: '20em',
            },
        }
    }));
    const { classes } = useStyles();
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    return (
        <div>
            <NavBarSplashPage />
            <Center>
                <Image className={classes.backgroundImage} radius='lg' src='./sandBeach.jpg' fit='cover' height={0.6 * windowSize.innerHeight} />
            </Center>
            <div className={classes.searchbar}>
                <SearchBox/>
            </div>
        </div>

    );
} 
SplashPage.displayName = "SplashPage"
export default SplashPage;
