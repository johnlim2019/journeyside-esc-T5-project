//import { hotelData } from '../data/hotelData' // temporary import of json 
import { Paper, Card, Image, Text, Badge, Button, Group, useMantineTheme, Progress, Loader } from '@mantine/core';
import './SearchItem.css';
import { useAppSelector} from '../hooks';
import { Suspense } from 'react';

function SearchItem() {

  //const api = useAppSelector(state => state.SearchBarReducer.api); // to load things from store !!!
  const dest = useAppSelector(state => state.SearchBarReducer.location); // to load things from store !!!
  console.log(dest);
  const theme = useMantineTheme();
  
  let headerString = dest || "Begin you Adventure!";
  //console.log(api);

  // fetch api!
  let hotelDataLs: any[] = [];
  hotelDataLs = useAppSelector(state => state.SearchBarReducer.hotelData); // to load things from store !!!


  return (
    <div className="results-container">
      <Paper style={{ width: '30rem', margin: 'auto', marginBottom: "2em" }}>
        <Text size="sm" className='subtitle' align='center'>{headerString}</Text>
      </Paper>
      <div className='card-container' style={{ width: '30rem', margin: 'auto', }}>
        {hotelDataLs.map((data, key) => {

          //console.log(data.image_details.prefix);
          let imageUrl = data.image_details.prefix + "0" + data.image_details.suffix;
          let ratingScore = data.rating / 5 * 100;
          let reviewScore = data.trustyou.score.kaligo_overall;
          let reviewColor = 'gray';
          if (reviewScore <= 1 && reviewScore> 0) {
            reviewColor = 'pink';
          }
          else if (reviewScore <= 3.5 && reviewScore > 1) {
            reviewColor = 'orange';
          }
          else if (reviewScore > 3.5) {
            reviewColor = 'green';
          }

          let ratingColor = 'pink';
          if (ratingScore <= 70 && ratingScore > 20) {
            ratingColor = 'orange';
          }
          else if (ratingScore > 70) {
            ratingColor = 'green';
          }
          let distance = data.distance;
          if (distance > 1000){
            distance = distance/1000;
          }
          distance = distance.toFixed(1);
          //console.log("rating: "+data.rating);
          //console.log("review: "+reviewScore)
          return (
            <>
              <Suspense fallback={
                <div style={{ width: '5em', margin: 'auto' }}>
                  <Loader />
                </div>
              }>
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
              </Suspense>
            </>
          );
        })}
      </div>
    </div>

  );
}

export default SearchItem;
