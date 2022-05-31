import { hotelData } from './hoteldata' // temporary import of json 
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Progress } from '@mantine/core';
import './SearchItem.css';

function getPrices() {
  
}

function SearchItem() {
  const theme = useMantineTheme();
  let hotelDataLs = [];
  for (let i = 0; i < 11  ; i++) {
    hotelDataLs.push(hotelData[i]);
  }
  return (
    <div className="results-container">
      <div className='card-container' style={{ width: '30rem', margin: 'auto', }}>
        {hotelDataLs.map((data, key) => {
          //console.log(data.image_details.prefix);
          let imageUrl = data.image_details.prefix + "0" + data.image_details.suffix;
          let ratingScore = data.rating / 5 * 100;
          let reviewScore = data.trustyou.score.kaligo_overall;
          let reviewColor = 'grey';
          if (reviewScore <= 1) {
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
          let distance = data.distance.toFixed(1);
          console.log("rating: "+data.rating);
          console.log("review: "+reviewScore)

          return (
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
          );
        })}
      </div>
    </div>

  );
}

export default SearchItem;
