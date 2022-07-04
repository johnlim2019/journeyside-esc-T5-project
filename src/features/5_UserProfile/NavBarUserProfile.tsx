import { Paper, Space, Center, Text, Grid, createStyles, Button, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MapPin } from 'tabler-icons-react';
function NavBar() {
    const useStyles = createStyles((theme) => ({
        navbar: {
            width: '50em',
            padding: '1em',
            margin: 'auto',
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                width: '100%',
            },
        },
        navbarContainer: {
            margin: 'auto',
            width:'100%',
            zIndex:2
        }
    }));
    const { classes } = useStyles();
    return (
        <>
        <Paper withBorder className={classes.navbarContainer}>
            <Grid columns={18} gutter='xs' p='sm'className={classes.navbar} >
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
                    <Button variant='subtle' color='gray' component={Link} to="/SearchResults">Search</Button>
                </Grid.Col>
            </Grid>
        </Paper>
        </>
    )

} export default NavBar