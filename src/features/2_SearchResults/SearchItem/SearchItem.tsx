//import { hotelData } from '../data/hotelData' // temporary import of json 
import { Paper, Card, Image, Text, Badge, Button, Group, useMantineTheme, ThemeIcon, NativeSelect, createStyles, Pagination, Center, Space, Loader, Overlay, Title, Grid, Stack, Skeleton } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../services/hooks';
import { useEffect, useState } from 'react';
import { pageItemsLoad, pageStartLoad, selectHotelId, setCategory } from '../../../services/SearchBarSlice';
import { IconStar, IconStarHalf, IconMoodSad } from '@tabler/icons';
import { Link } from 'react-router-dom';


const NOTFOUND = "We could not find results for ";
// const NOSERVICE = "Sorry Service is down";
// set up themes for classes
const useStyles = createStyles((theme) => ({
  cardContainer: {
    width: '40rem',
    margin: 'auto',
    marginTop: "2rem",
    // Media query with value from theme
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: '80%',
      alignItems: 'center'
    },
  },
  title: {
    color: 'black',
    fontWeight: 500
  },
  subtitle: {
    color: 'gray'
  },
  resultsContainer: {
    width: 'auto',
    position: 'relative',
    alignItems: 'center'
  },
  cardMain: {
    boxShadow: '0 10px 20px 0px #00000033',
    '&:hover': {
      boxShadow: '0 14px 28px 0px #00000033',
    }
  },
}));
export function sortResults(hotelDataLongSort: any, sortBy: string) {
  if (sortBy === "Rating") {
    if (hotelDataLongSort.length > 0) {
      // console.log("sort by rating");
      hotelDataLongSort.sort((a: any, b: any) => (a.rating < b.rating) ? 1 : -1);
    }
  }
  else if (sortBy === "Reviews") {
    if (hotelDataLongSort.length > 0) {
      // console.log("sort by review");
      hotelDataLongSort.sort((a: any, b: any) => (a.trustyou.score.kaligo_overall < b.trustyou.score.kaligo_overall) ? 1 : -1);
    }
  }
  else if (sortBy === "Price") {
    if (hotelDataLongSort.length > 0) {
      // console.log("sort by price");
      hotelDataLongSort.sort((a: any, b: any) => (a.converted_price > b.converted_price) ? 1 : -1);
    }
  }
  else if (sortBy === "Value") {
    if (hotelDataLongSort.length > 0) {
      // console.log("sort by value");
      hotelDataLongSort.sort((a: any, b: any) => (((a.coverted_max_cash_payment - a.converted_price) / a.coverted_max_cash_payment) * 5 + a.rating * 0.8 + a.trustyou.score.kaligo_overall * 1.2 < ((b.coverted_max_cash_payment - b.converted_price) / b.coverted_max_cash_payment) * 5 + b.rating * 0.8 + b.trustyou.score.kaligo_overall * 1.2) ? 1 : -1);
    }
  }
  else if (sortBy === "Sale") {
    if (hotelDataLongSort.length > 0) {
      // console.log("sort by value");
      hotelDataLongSort.sort((a: any, b: any) => ( /*the misspelled converted here so type coverted */
        (a.coverted_max_cash_payment - a.converted_price) / a.coverted_max_cash_payment < (b.coverted_max_cash_payment - b.converted_price) / b.coverted_max_cash_payment) ? 1 : -1);
    }
  }
  return hotelDataLongSort;
}
export function getCardValues(data: any, nights: number) {
  //console.log(data.image_details.prefix);
  // get Card values. 
  let imageUrl = data.image_details.prefix + "1" + data.image_details.suffix;
  let ratingScore = data.rating;
  let reviewScore = data.trustyou.score.kaligo_overall;
  let reviewColor = 'gray';
  if (reviewScore <= 1 && reviewScore > 0) {
    reviewColor = 'pink';
  }
  else if (reviewScore <= 2.5 && reviewScore > 1) {
    reviewColor = 'orange';
  }
  else if (reviewScore <= 4 && reviewScore > 2.5) {
    reviewColor = 'blue';
  }
  else if (reviewScore > 4) {
    reviewColor = 'green';
  }
  let distance = data.distance;
  if (distance > 1000) {
    distance = distance / 1000;
  }
  distance = distance.toFixed(1);
  let convertedPrice = data.converted_price / nights;
  let convertedPriceStr = convertedPrice.toFixed(2);
  let maxConvertedPrice = data.coverted_max_cash_payment / nights; // the data base misspells it so pleas misspell it
  let maxConvertedPriceStr = maxConvertedPrice.toFixed(2);
  return [imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPriceStr, maxConvertedPriceStr]
}


export function isSale(price: number, maxPrice: number) {
  // console.log("price " + price);
  // console.log("maxPrice " + maxPrice);
  let salePercent = (maxPrice - price) / maxPrice * 100;
  let colour = 'gray';
  if (salePercent < 5 && salePercent > 0) {
    colour = 'yellow';
  }
  else if (salePercent >= 5 && salePercent < 10) {
    colour = 'orange';
  }
  else if (salePercent >= 10 && salePercent < 20) {
    colour = 'pink';
  }
  else if (salePercent >= 20) {
    colour = 'red';
  }
  else {
    return (
      <Space h='md'></Space>
    );
  }
  let salePercentOut = salePercent.toFixed(1);
  return (
    <Badge id='review' color={"" + colour} variant="filled" style={{ marginTop: '.7rem' }}>
      was {maxPrice} -{salePercentOut}%
    </Badge>
  );
}
export function getStars(ratingScore: number) {
  // console.log("HELP "+ratingScore);
  if (ratingScore === 1) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
      </Group>
    )
  }
  else if (ratingScore === 1.5) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStarHalf />
        </ThemeIcon>
      </Group>)
  }
  else if (ratingScore === 2) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
      </Group>)
  }
  else if (ratingScore === 2.5) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStarHalf />
        </ThemeIcon>
      </Group>)
  }
  else if (ratingScore === 3) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
      </Group>)
  }
  else if (ratingScore === 3.5) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStarHalf />
        </ThemeIcon>
      </Group>)
  }
  else if (ratingScore === 4) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
      </Group>)
  }
  else if (ratingScore === 4.5) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStarHalf />
        </ThemeIcon>
      </Group>)
  }
  else if (ratingScore === 5) {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
        <ThemeIcon color='yellow'>
          <IconStar />
        </ThemeIcon>
      </Group>)
  }
  else {
    return (
      <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: '0.5em' }}>

      </Group>
    )
  }
}

function SearchItem() {
  const dest = useAppSelector(state => state.SearchBarReducer.location); // to load things from store !!!
  // const queryId = useAppSelector(state => state.SearchBarReducer.locationId); // to load things from store !!!
  // const destId = useAppSelector(state => state.SearchBarReducer.hotelData.locationId); // This shows whether the search bar API GET request is successful? NO means there was a catch
  let hotelDataLong = useAppSelector(state => state.SearchBarReducer.hotelData.hotels); // to load things from store !!!
  const isLoading = useAppSelector(state => state.SearchBarReducer.isLoading);
  const checkIn = useAppSelector(state => state.SearchBarReducer.checkIn);
  const checkOut = useAppSelector(state => state.SearchBarReducer.checkOut);
  const nightsNum = (checkOut - checkIn) / 86400000;
  const pageNum = useAppSelector(state => state.SearchBarReducer.pageStart);
  // console.log(pageNum);

  // console.log("HELP "+dest);
  // console.log("HELP "+destId);
  // console.log("HELP "+hotelDataLong);
  let header = dest
  if (hotelDataLong.length < 1) {
    header = NOTFOUND + dest;
  }
  // set up pagination settings
  const dispatch = useAppDispatch(); // to add things to store!!!

  // sort selector
  const [sortBy, setSortBy] = useState(useAppSelector(state => state.SearchBarReducer.sortByCat));

  // sort code
  // create copy to sort
  var hotelDataLongSort = [...hotelDataLong];
  hotelDataLongSort = sortResults(hotelDataLongSort, sortBy);
  // assign the new sorted values
  hotelDataLong = hotelDataLongSort;

  const [numberItemsDirty, setNumberItemsDirty] = useState(useAppSelector(state => state.SearchBarReducer.pageItems) + " items");
  const [activePage, setPage] = useState(useAppSelector(state => state.SearchBarReducer.pageStart));

  useEffect(()=>{
    setPage(pageNum);
  },[pageNum])
  // Pagination controls
  const numberItems = +numberItemsDirty.slice(0, 3).trim();
  const elementsStart = ((activePage - 1) * numberItems);
  let elementsEnd = (elementsStart + numberItems);
  let numPages = Math.ceil(hotelDataLong.length / numberItems);
  if (elementsEnd >= hotelDataLong.length) {
    elementsEnd = hotelDataLong.length;
  }

  // print the new list of data
  let hotelDataLs: any[] = [];
  for (let i = elementsStart; i < elementsEnd; i++) {
    hotelDataLs.push(hotelDataLong[i]);
  }

  // show or hide pagination!
  let hidden = true;
  if (hotelDataLs.length === 0) {
    hidden = false;
  }
  // declare mantine style classes
  // const theme = useMantineTheme();
  const { classes } = useStyles();

  const numberItemsLs = ['10 items', '20 items', '30 items', '40 items', '50 items'];
  useEffect(() => {
    if (isLoading === true) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);
  


  return (
    <div className={classes.resultsContainer} >
      {isLoading && <Overlay color='white' opacity={1} style={{
        zIndex: '10'
      }}>
      </Overlay>}
      {isLoading && <Center style={{
        position: 'fixed',
        top: 0,
        height: '100%',
        width: "100%",
        zIndex: '20'
      }}>
        <div className='loaderSpinner'></div>
        <Text color='dimmed' p='lg'>Hold tight...</Text>
        <Loader style={{ zIndex: '100', opacity: '1' }} />
      </Center>
      }
      <Center>
        <div className='notification'>
          <Text style={{ marginTop: "2rem", color: 'gray' }}>
            {header}
          </Text>
        </div>
      </Center>

      {hidden && <Paper className={classes.cardContainer} mt='lg' mb='lg'>
        {/* <Pagination total={numPages} size="xs" radius="xs" withEdges /> */}
        <Group position='center'>
          <Text pl='lg' pr='lg' color='dimmed'>Showing {elementsStart+1} to {elementsEnd} of {hotelDataLong.length} hotels</Text>
          <Group>
            <div className='numberItems'>
              <NativeSelect
                data={numberItemsLs}
                value={numberItemsDirty}
                onChange={(event) => {
                  setNumberItemsDirty(event.currentTarget.value);
                  dispatch(pageItemsLoad({
                    items: event.currentTarget.value.slice(0, 3).trim()
                  }))
                }}
                label="Show per page:"
                radius="md"
                size="xs"
                sx={{ width:'8em' }}
              />
            </div>
            <div className='category'>
              <NativeSelect
                data={['Reviews', 'Rating', 'Price', 'Value', "Sale"]}
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.currentTarget.value);
                  dispatch(setCategory({ category: event.currentTarget.value }));
                }}
                label="Sort By: "
                radius="md"
                size="xs"
                sx={{ width:'8em' }}
              />
            </div>
          </Group>
        </Group>
      </Paper>}

      <div className={classes.cardContainer}>
        {!hidden && <Center pt={32}><Text color='dimmed'>We could not find any results for your search</Text>&nbsp;<IconMoodSad color='gray'/></Center>}
        {hotelDataLs.map((data, key) => {
          // Load card values
          let [imageUrl, ratingScore, reviewScore, reviewColor, distance, price, ogPrice] = getCardValues(data, nightsNum);

          let salesComp = isSale(price, ogPrice);
          let starsComp = getStars(ratingScore);
          return (
            <>
              <Card key={key} className={classes.cardMain} p="md" mb={32}>
                <Card.Section>
                  <Image id='image' withPlaceholder={true} src={imageUrl} height={160} alt={data.name} />
                </Card.Section>
                <Space h="sm" />
                <Grid>
                  <Grid.Col xs={8}>
                    <Title order={3} id='title' mb={0} className={classes.title}>{data.name}</Title>
                    <Text id="address" size="sm" className={classes.subtitle}>
                      {data.address}
                    </Text>
                    <Text id="distance" size="sm" className={classes.subtitle}>
                      {distance}km from airport
                    </Text>
                    {salesComp}
                    <Badge id='review' color={reviewColor} variant="filled" size="lg" radius="xs" >
                        Reviews: {reviewScore}
                      </Badge>
                    {starsComp}
                  </Grid.Col>
                  <Grid.Col xs={4}>
                    <Stack justify="space-between" sx={{ height:"100%" }}>
                      <Stack spacing={0} justify="flex-start">
                        <Text sx={{ fontSize: "2em" }}>${price}</Text>
                        <Text mt={-8}>a night</Text>
                      </Stack>
                      <Button variant="filled" fullWidth loaderPosition="right"
                      onClick={() => dispatch(selectHotelId({ id: data.id }))}
                      component={Link} to="/RoomDetails"
                    >
                        Select
                      </Button>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card>
            </>
          );
        })}
        <div className='pagination'>
          <Paper className={classes.cardContainer} style={{ marginBottom: "2em" }}>
            <Group position='center' spacing='xl'>
              {hidden && <Pagination total={numPages} size="xs" radius="xs" withEdges page={activePage} onChange={
                (value) => {
                  setPage(value);
                  dispatch(pageStartLoad({ start: value }));
                }
              } style={{ marginTop: '1.75em' }} />}
            </Group>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
