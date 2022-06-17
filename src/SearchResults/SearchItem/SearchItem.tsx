//import { hotelData } from '../data/hotelData' // temporary import of json 
import { Paper, Card, Image, Text, Badge, Button, Group, useMantineTheme, ThemeIcon, NativeSelect, createStyles, Pagination, Center } from '@mantine/core';
import './SearchItem.css';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useEffect, useState } from 'react';
import { pageItemsLoad, pageStartLoad, selectHotelId, setCategory } from '../../services/SearchBarSlice';
import { Star, StarHalf } from 'tabler-icons-react';

const NOTFOUND = "We could not find results for ";
const NOTFOUNDEMPTY = "Please enter a destination!";
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
function sortResults(hotelDataLongSort: any, sortBy: string, hotelPrice: any) {
  if (sortBy === "Rating") {
    if (hotelDataLongSort.length > 0) {
      console.log("sort by rating");
      hotelDataLongSort.sort((a: any, b: any) => (a.rating < b.rating) ? 1 : -1);
    }
  }
  else if (sortBy === "Reviews") {
    if (hotelDataLongSort.length > 0) {
      console.log("sort by review");
      hotelDataLongSort.sort((a: any, b: any) => (a.trustyou.score.kaligo_overall < b.trustyou.score.kaligo_overall) ? 1 : -1);
    }
  }
  else if (sortBy === "Price") {
    if (hotelDataLongSort.length > 0) {
      console.log("sort by price");
      hotelDataLongSort.sort((a: any, b: any) => (a.converted_price > b.converted_price) ? 1 : -1);
    }
  }
  else if (sortBy === "Value") {
    if (hotelDataLongSort.length > 0) {
      console.log("sort by value");
      hotelDataLongSort.sort((a: any, b: any) => (
        a.rating/a.converted_price+20*a.trustyou.score.kaligo_overall >  b.rating/b.converted_price+20*b.trustyou.score.kaligo_overall) ? 1 : -1);
    }
  }
  return hotelDataLongSort;
}
function getCardValues(key: number, data: any) {
  //console.log(data.image_details.prefix);
  let imageUrl = data.image_details.prefix + "1" + data.image_details.suffix;
  let ratingScore = data.rating;
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
  let distance = data.distance;
  if (distance > 1000) {
    distance = distance / 1000;
  }
  distance = distance.toFixed(1);
  let convertedPrice = data.converted_price;
  let maxConvertedPrice = data.coverted_max_cash_payment; // the data base misspells it so pleas mispellit
  return [imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice]
}


function isSale(price:number,maxPrice:number){
  console.log("price "+price);
  console.log("maxPrice "+maxPrice);
  let salePercent = (maxPrice - price)/maxPrice *100;
  let colour = 'gray';
  if (salePercent <= 5 && salePercent >0){
    colour = 'blue';
  }
  else if (salePercent > 5 && salePercent <=10){
    colour = 'green';
  }
  else if (salePercent > 10 && salePercent <=20){
    colour = 'pink';
  }
  else if (salePercent > 20){
    colour = 'red';
  }
  // else{
  //   return(
  //     <Space h='md'></Space>
  //   );
  // }
  return(
    <Badge id='review' color={""+colour} variant="filled" style={{marginTop:'.7rem'}}>
    {salePercent}% off
    </Badge>
  );
}

function SearchItem() {
  const dest = useAppSelector(state => state.SearchBarReducer.location); // to load things from store !!!
  const destId = useAppSelector(state => state.SearchBarReducer.locationId);
  let hotelDataLong = useAppSelector(state => state.SearchBarReducer.hotelData.hotels); // to load things from store !!!



  // header update based on whether valid dest id was found 
  let header = "";
  if (dest.length === 0) {
    header = NOTFOUNDEMPTY;
  }
  else if (destId.length === 0) {
    header = NOTFOUND + dest + ".";
  }


  // header to confirm the destination in store
  let headerString = header || "Begin you Adventure!";
  //console.log(api); 

  // set up pagination settings
  const dispatch = useAppDispatch(); // to add things to store!!!

  // sort selector
  const [sortBy, setSortBy] = useState(useAppSelector(state => state.SearchBarReducer.sortByCat));

  // sort code
  // create copy to sort
  var hotelDataLongSort = [...hotelDataLong];
  hotelDataLongSort = sortResults(hotelDataLongSort, sortBy, []);
  // assign the new sorted values
  hotelDataLong = hotelDataLongSort;

  const [numberItemsDirty, setNumberItemsDirty] = useState(useAppSelector(state => state.SearchBarReducer.pageItems) + " items");
  const [activePage, setPage] = useState(1);
  const value = useAppSelector(state => state.SearchBarReducer.pageStart);

  // Pagination controls
  const numberItems = +numberItemsDirty.slice(0, 3).trim();
  const elementsStart = ((activePage - 1) * numberItems);
  let elementsEnd = (elementsStart + numberItems);
  let numPages = Math.ceil(hotelDataLong.length / numberItems);
  if (elementsEnd >= hotelDataLong.length) {
    elementsEnd = hotelDataLong.length;
  }
  // set default page
  // console.log("HELP "+value);
  // eslint-disable-next-line
  useEffect(() => {
    setPage(value);
    // console.log("HELP "+activePage);
  });

  console.log("search item component");
  console.log('active page: ' + activePage);
  console.log('numberItems: ' + numberItemsDirty.slice(0, 3));
  console.log("element Start "+elementsStart);

  // print the new list of data
  let hotelDataLs: any[] = [];
  for (let i = elementsStart; i < elementsEnd; i++) {
    hotelDataLs.push(hotelDataLong[i]);
  }
  // console.log("start item: " + elementsStart);
  // console.log("LIST SIZE: " + hotelDataLs.length);
  // console.log("end item: " + elementsEnd);

  // show or hide pagination!
  let hidden = true;
  if (hotelDataLs.length === 0) {
    hidden = false;
  }
  // declare mantine style classes
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const numberItemsLs = ['10 items', '20 items', '30 items', '40 items', '50 items', '100 items'];
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
              data={numberItemsLs}
              value={numberItemsDirty}
              onChange={(event) => setNumberItemsDirty(event.currentTarget.value)}
              label="Show"
              radius="md"
              size="xs"
              style={{ width: '5em' }}
            />
            <NativeSelect
              data={['Reviews', 'Rating', 'Price', 'Value']}
              value={sortBy}
              onChange={(event) => { setSortBy(event.currentTarget.value);
                dispatch(setCategory({ category: event.currentTarget.value })); }}
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
          // Load card values
          let [imageUrl, ratingScore, reviewScore, reviewColor, distance, price, ogPrice] = getCardValues(key, data);
          function getStars(ratingScore: number) {
            // console.log("HELP "+ratingScore);
            if (ratingScore === 1) {
              return (
                <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                  <ThemeIcon color='yellow'>
                    <Star />
                  </ThemeIcon>
                </Group>
              )
            }            
            else if (ratingScore === 1.5){
              return(
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <StarHalf />
              </ThemeIcon>
            </Group>)
            }
            else if (ratingScore === 2) {
              return (
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                <ThemeIcon color='yellow'>
                  <Star />
                </ThemeIcon>
                <ThemeIcon color='yellow'>
                  <Star />
                </ThemeIcon>
              </Group>)
            }
            else if (ratingScore === 2.5){
              return(
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <StarHalf />
              </ThemeIcon>
            </Group>)
            }
            else if (ratingScore === 3){
              return(
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
            </Group>)
            }
            else if (ratingScore === 3.5){
              return(
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <StarHalf />
              </ThemeIcon>
            </Group>)
            }
            else if (ratingScore === 4){
              return (
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
            </Group>)
            }
            else if (ratingScore === 4.5){
              return (
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <StarHalf />
              </ThemeIcon>
            </Group>)
            }
            else if (ratingScore === 5){
              return(
              <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
              <ThemeIcon color='yellow'>
                <Star />
              </ThemeIcon>
            </Group>)
            } 
            else {
              return(
                  <Group position="left" spacing={5} style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>

                  </Group>
              )
            }
          }
          let salesComp = isSale(price,ogPrice);

          let starsComp = getStars(ratingScore);
          return (
            <>
              <Card key={key} className="card-main" p="lg" style={{ marginBottom: '5em' }}>
                <Card.Section>
                  <Image id='image' withPlaceholder={true} src={imageUrl} height={160} alt={data.name} />
                </Card.Section>
                <Text id='title' className={classes.title} style={{marginTop:'1rem'}}>{data.name}</Text>
                <Text id="address" size="sm" className={classes.subtitle}>
                  Address: {data.address}
                </Text>
                <Text id="distance" size="sm" className={classes.subtitle}>
                  {distance}km from airport
                </Text>
                {salesComp}
                <Group position="apart" style={{ marginBottom: 5, marginTop: 0}}>
                {starsComp}
                <Badge id='review' color={reviewColor} variant="filled" size="lg" radius="xs" >
                    Reviews: {reviewScore}
                </Badge>
                </Group>
                <Button variant="filled" color="blue" fullWidth loaderPosition="right"
                  onClick={() => dispatch(selectHotelId({ id: data.id }))}
                >
                  <Center>${price} a night</Center>
                </Button>
              </Card>
            </>
          );
        })}
        <Paper className={classes.cardContainer} style={{ marginBottom: "2em" }}>
          <Group position='center' spacing='xl'>
            {hidden && <Pagination total={numPages} size="xs" radius="xs" withEdges page={activePage} onChange={
              (value) => {
                setPage(value);
                dispatch(pageStartLoad({ start: value }));
              }
            } style={{ marginTop: '1.75em' }} />}
            <NativeSelect
              data={numberItemsLs}
              value={numberItemsDirty}
              onChange={(event) => {
                setNumberItemsDirty(event.currentTarget.value);
                dispatch(pageItemsLoad({ items: event.currentTarget.value.slice(0, 3).trim() 
                }))
              }}
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
