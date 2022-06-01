import { createStyles, Autocomplete, Text, Button, Space, NativeSelect, Grid, MantineProvider, Paper, MediaQuery, ThemeIcon, THEME_ICON_SIZES } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    searchbarwrapper: {
        width: '75%',
        padding: '0 0 0 5px',
        margin: 'auto',
        marginBottom: '1em',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: '100%'
        },
    },
    searchbarcomponets: {
        size: 'md',
        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            size: 'xs'
        },
    },
}));


function SearchBar() {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let date2 = new Date();
    date2.setDate(date.getDate() + 1);
    const [value, setValue] = useState<[Date | null, Date | null]>([
        date,
        date2
    ]);
    const [adults, setAdults] = useState('');
    const [children, setChildren] = useState('');
    let nights = date2.getUTCDate() - date.getUTCDate();
    const { classes } = useStyles();

    return (

        <div className={classes.searchbarwrapper} >
            <Paper shadow='sm'>
                <Grid columns={18} grow gutter='sm' align='center' p='md' >
                    <Grid.Col span={4}>
                        <Paper>
                            <Autocomplete
                                className={classes.searchbarcomponets}
                                label="Destination"
                                placeholder="Begin Your Adventure"
                                data={['Singapore', 'Changi, Singapore', 'Kuala Lumpur']}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Paper>
                            <DateRangePicker
                                className={classes.searchbarcomponets}
                                label="Dates"
                                placeholder="Date range"
                                firstDayOfWeek="sunday"
                                minDate={date}
                                value={value}
                                onChange={setValue}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Paper>
                            <NativeSelect
                                className={classes.searchbarcomponets}
                                data={['1', '2', '3', '4']}
                                placeholder="2"
                                label="Adults"
                                value={adults}
                                onChange={(event) => setAdults(event.currentTarget.value)}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Paper>
                            <NativeSelect
                                className={classes.searchbarcomponets}
                                data={['0', '1', '2', '3', '4']}
                                value={children}
                                label="Kids"
                                onChange={(event) => setChildren(event.currentTarget.value)}
                            />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Paper>
                            <NativeSelect
                                className={classes.searchbarcomponets}
                                data={['1', '2']}
                                label='Rooms'
                            />
                        </Paper>

                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Space className={classes.searchbarcomponets} h="xl" />
                        <Button fullWidth={true} >GO!</Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </div>



    );
} export default SearchBar;