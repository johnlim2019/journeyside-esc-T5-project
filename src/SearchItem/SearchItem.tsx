//import { hotelData } from '../data/hotelData' // temporary import of json 
import { Paper, Card, Image, Text, Badge, Button, Group, useMantineTheme, Progress, NativeSelect, createStyles, Pagination, Center } from '@mantine/core';
import './SearchItem.css';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useState } from 'react';
import { pageItemsLoad, pageStartLoad, selectHotelId } from '../SearchBar/SearchBarSlice';

// set up themes for classes
const useStyles = createStyles((theme) => ({
  cardContainer: {
    width: '30rem',
    margin: 'auto',
    marginTop: "2rem",
    // Media query with value from theme
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: '22rem',
      alignItems: 'center'
    },
  },
  title: {
    color: 'black',
    fontWeight: 500,
    fontSize: '1.2em'
  },
  subtitle: {
    color: 'gray'
  },
  resultsContainer: {
    minHeight: '100%',
    width: 'auto',
    alignItems: 'center'
  }

}));


function SearchItem() {

  //const api = useAppSelector(state => state.SearchBarReducer.api); // to load things from store !!!
  const dest = useAppSelector(state => state.SearchBarReducer.location); // to load things from store !!!
  console.log(dest);
  const theme = useMantineTheme();

  // header to confirm the destination in store
  let headerString = dest || "Begin you Adventure!";
  //console.log(api);

  // set up pagination settings
  const dispatch = useAppDispatch(); // to add things to store!!!
  const [numberItemsDirty, setNumberItemsDirty] = useState("10");
  const [activePage, setPage] = useState(1);
  console.log('active page: ' + activePage);
  console.log('numberItems: ' + numberItemsDirty.slice(0, 3));

  // update the store on interaction with pagination element we dispatch new page 
  dispatch(pageStartLoad({ start: activePage - 1 }))
  // on change of number items we update the store
  dispatch(pageItemsLoad({ items: +numberItemsDirty.slice(0, 3).trim() })) // cast string to number 

  // fetch data from store
  let hotelDataLong = useAppSelector(state => state.SearchBarReducer.hotelData); // to load things from store !!!
  let numberItems = useAppSelector(state => state.SearchBarReducer.pageItems);
  let elementsStart = useAppSelector(state => state.SearchBarReducer.pageStart);

  // sort selector
  const [sortBy, setSortBy] = useState("reviews");
  // sort code
  var hotelDataLongSort = [...hotelDataLong];
  if (sortBy === "Rating"){
    if (hotelDataLongSort.length > 0) {
      console.log("sort by rating");
      hotelDataLongSort.sort((a: any, b: any) => (a.rating < b.rating) ? 1 : -1);
    }
  }
  else if (sortBy === "Reviews") {
    if (hotelDataLongSort.length > 0) {
      console.log("sort by rating");
      hotelDataLongSort.sort((a: any, b: any) => (a.trustyou.score.kaligo_overall < b.trustyou.score.kaligo_overall) ? 1 : -1);
    }
  }
hotelDataLong = hotelDataLongSort;

   

  // Pagination controls
  let elementsEnd = elementsStart + numberItems;
  let numPages = Math.ceil(hotelDataLong.length / numberItems);
  if (elementsEnd >= hotelDataLong.length) {
    elementsEnd = hotelDataLong.length;
  }

  // print the new list of data
  let hotelDataLs: any[] = [];
  for (let i = elementsStart; i < elementsEnd; i++) {
    hotelDataLs.push(hotelDataLong[i]);
  }
  console.log("start item: " + elementsStart);
  console.log("LIST SIZE: " + hotelDataLs.length);
  console.log("end item: " + elementsEnd);

  const { classes } = useStyles();
  // show or hide pagination!
  let hidden = true;
  if (hotelDataLs.length === 0) {
    hidden = false;
  }


  return (
    <div className={classes.resultsContainer}>
      <Paper className={classes.cardContainer} style={{ marginBottom: "2em" }}>
        <div>
          <Text size="md" className={classes.subtitle} align='center'>{headerString}</Text>
        </div>
        {/* <Pagination total={numPages} size="xs" radius="xs" withEdges /> */}
        <Center>
          <Group>
            <NativeSelect
              data={['10 items', '20 items', '30 items', '40 items', '50 items', '100 items']}
              value={numberItemsDirty}
              onChange={(event) => setNumberItemsDirty(event.currentTarget.value)}
              label="Show"
              radius="md"
              size="xs"
              style={{ width: '5em' }}
            />
            <NativeSelect
              data={['Reviews', 'Rating', 'Popular']}
              value={sortBy}
              onChange={(event) => setSortBy(event.currentTarget.value)}
              label="Sort By: "
              radius="md"
              size="xs"
              style={{ width: '5em' }}
            />
          </Group>

        </Center>

      </Paper>
      <div className={classes.cardContainer}>
        {hotelDataLs.map((data, key) => {
          // preparing Card data
          //console.log(data.image_details.prefix);
          let imageUrl = data.image_details.prefix + "1" + data.image_details.suffix;
          let ratingScore = data.rating / 5 * 100;
          let reviewScore = data.trustyou.score.kaligo_overall;
          let reviewColor = 'gray';
          if (reviewScore <= 1 && reviewScore > 0) {
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
          if (distance > 1000) {
            distance = distance / 1000;
          }
          distance = distance.toFixed(1);
          //console.log("rating: "+data.rating);
          //console.log("review: "+reviewScore)
          return (
            <>
              <Card key={key} className="card-main" p="lg" style={{ marginBottom: '5em' }}>
                <Card.Section>
                  <Image id='image' withPlaceholder={true} src={imageUrl} height={160} alt={data.name} />
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                  <Text id='title' className={classes.title}>{data.name}</Text>
                  <Badge id='review' color={reviewColor} variant="light">
                    Reviews: {data.trustyou.score.kaligo_overall}
                  </Badge>
                </Group>
                <Text id="address" size="sm" className={classes.subtitle}>
                  Address: {data.address}
                </Text>
                <Text id="distance" size="sm" className={classes.subtitle}>
                  {distance}km from airport
                </Text>
                <Text id="rating" size="sm" className={classes.subtitle}>
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
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}
                  onClick={() => dispatch(selectHotelId({ id: data.id }))}
                >
                  Book Room
                </Button>
              </Card>
            </>
          );
        })}
        <Paper className={classes.cardContainer} style={{ marginBottom: "2em" }}>
          <Group position='center' spacing='xl'>
            {/* <div>
          <Space h='xl'></Space>
        <Text size="md" className={classes.subtitle} align='center'>{headerString}</Text>
        </div> */}
            {hidden && <Pagination total={numPages} size="xs" radius="xs" withEdges page={activePage} onChange={setPage} />}
            <NativeSelect
              data={['10 items', '20 items', '30 items', '40 items', '50 items', '100 items']}
              value={numberItemsDirty}
              onChange={(event) => setNumberItemsDirty(event.currentTarget.value)}
              label="Show"
              radius="md"
              size="xs"
            />
          </Group>
        </Paper>
      </div>
    </div>

  );
}

export default SearchItem;
