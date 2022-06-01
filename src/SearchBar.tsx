import { Card, Image, Text, Badge, Button, Group, Progress, Grid, MantineProvider, Paper } from '@mantine/core';

function SearchBar() {
    return (
        <div className='search-bar-wrapper' style={{ width: '75%', margin: 'auto' }}>
            <MantineProvider

            >

                <Grid grow gutter='sm' align='center'>
                    <Grid.Col span={3}>
                        <Paper shadow='sm'>
                            <Text>Location:</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Paper shadow='sm'>
                            <Text>StartDate</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Paper shadow='sm'>
                            <Text>nights</Text>
                        </Paper>
                    </Grid.Col>                    
                    <Grid.Col span={3}>
                        <Paper shadow='sm'>
                            <Text>WAHT</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button>GO!</Button>
                    </Grid.Col>


                </Grid>
            </MantineProvider>

        </div>
    );
} export default SearchBar;