import {  Card, Image, Text, Badge, Button, Group, useMantineTheme, Progress } from '@mantine/core';
import './SearchItem.css';


function SearchItemTwo(key:number, data:any, imageUrl:string,reviewColor:string, distance:number,ratingColor:string,ratingScore:number) {
    const theme = useMantineTheme();
    return (
        <>
            <Card key={key} className="card-main" p="lg" style={{ marginBottom: '5em' }}>
                  <Card.Section>
                    <Image id='image' withPlaceholder={true} src={imageUrl} height={160} alt={data.name} />
                  </Card.Section>

                  <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text id='title' className='title'>{data.name}</Text>
                    <Badge id='review' color={reviewColor} variant="light">
                      Reviews: {data.trustyou.score.kaligo_overall}
                    </Badge>
                  </Group>
                  <Text id="address" size="sm" className='subtitle'>
                    Address: {data.address}
                  </Text>
                  <Text id="distance" size="sm" className='subtitle'>
                    {distance}km from airport
                  </Text>
                  <Text id="rating" size="sm" className='subtitle'>
                    Rating: {data.rating} out of 5
                  </Text>
                  <Progress
                    color={ratingColor}
                    style={{ marginTop: 10 }}
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[5],

                    })}
                    value={ratingScore}
                  />
                  <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                    299 a night
                  </Button>
                </Card>
        </>
    )
} export default SearchItemTwo;