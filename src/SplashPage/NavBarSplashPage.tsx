import { Paper, Space, Center, Text, Grid, createStyles, Button, ThemeIcon } from '@mantine/core';
import { MapPin } from 'tabler-icons-react';
function NavBarSplashPage() {
    const useStyles = createStyles((theme) => ({
        navbar: {
            width: '50em',
            padding: '1em',
            margin: 'auto',
            borderBottom:"solid gray 2px",
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                width: '100%',
            },
        },
        navbarContainer: {
            margin: 'auto',
            //border: '5px solid red'
        }
    }));
    const { classes } = useStyles();
    return (
        <>
            <Space h='xl' />
            <div className={classes.navbarContainer}>
                <Paper withBorder className={classes.navbar}>
                    <Grid columns={18} gutter='xs' p='sm'>
                        <Grid.Col span={6}>
                            <Center>
                                <ThemeIcon variant='light'>
                                    <MapPin />
                                </ThemeIcon>
                                <Space w="md" />
                                <Text style={{ paddingTop: 5, userSelect: 'none' }}>journeyside</Text>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={10}>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Button variant='subtle' color='gray'>Log In</Button>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </div>


        </>

    )

} export default NavBarSplashPage