import SearchBox from './SearchBoxSplashPage';
import NavBarSplashPage from './NavBarSplashPage';
import { Center, createStyles, Image, ThemeIcon, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';

const SplashPage = () => {
    const useStyles = createStyles((theme) => ({
        backgroundImage: {
            top: '13em',
            width: '45%',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'fixed',
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                top: '13em',
                width: '60%',
            },
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                top: '13em',
                width: '95%',
            },
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                top: '7.5em',
                width: '100%',
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
 

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <NavBarSplashPage />
            <Center>
                <Image className={classes.backgroundImage} radius='lg' src='./sandBeach.jpg' fit='cover' height={'35em'} />
            </Center>
            <div className={classes.searchbar}>
                <SearchBox />
            </div>
        </div>

    );
}
SplashPage.displayName = "SplashPage"
export default SplashPage;