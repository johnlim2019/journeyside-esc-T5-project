import { Card, Group, Image, Title, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
function getCardValues(data:any) {
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
  let maxConvertedPrice = data.coverted_max_cash_payment; // the data base misspells it so pleas mispell it
  return [imageUrl, ratingScore, reviewScore, reviewColor, distance, convertedPrice, maxConvertedPrice] 
}
function RoomType() {
  const selectedHotelId = useAppSelector(state => state.SearchBarReducer.selectHotelId); // to load things from store !!!
  const selectedHotelObj = useAppSelector(state => state.SearchBarReducer.selectHotelObj);
  console.log(selectedHotelId);
  let [imageUrl, ratingScore, reviewScore, reviewColor, distance, price, ogPrice] = getCardValues(selectedHotelObj);

  return (
    <Card shadow="md" mt={16} mb={16}>
      <Card.Section mb={16}>
        <Image withPlaceholder height={120} src={imageUrl} />
      </Card.Section>
      <Title order={3}>{selectedHotelObj.name}</Title>
      <Text size="sm">Address: {selectedHotelObj.address}</Text>
      <Text size="sm">{distance} km from Airport </Text>
      <Text size="sm">{ratingScore} out of 5</Text>
      <Button fullWidth component={Link} to="/roomdetail">${price}</Button>
    </Card>
  );

}

export default RoomType;