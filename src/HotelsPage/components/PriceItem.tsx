import { Card, Text, Image, Group, Badge, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
function getHotelPrice(obj:any){
  if (obj == null){
    console.error("null object does not have hotel details");
    return [];
  }
  return [obj.converted_price,obj.coverted_max_cash_payment];
}
function getHotelDetails(obj:any){
  if (obj == null){
    console.error("null object does not have hotel details");
    return [];
  }
  return [obj.name,obj.address,obj.address1,obj.description,obj.amenities,obj.trustyou,obj.distance,obj.rating];

}
function PriceItem() {
  const selectedHotelId = useAppSelector(state => state.SearchBarReducer.selectHotelId); // to load things from store !!!
  const selectedHotelObj = useAppSelector(state => state.SearchBarReducer.selectHotelObj);
  console.log(selectedHotelId);
  const [price,maxPrice] = getHotelPrice(selectedHotelObj);
  const [name,address,address1,description,amenitiesObj,trustyou,distance,rating] = getHotelDetails(selectedHotelObj);
  const reviews = trustyou.score.kaligo_overall;
  
  return (
    <Card shadow="md" mt={16} mb={16}>
      <Card.Section mb={16}>
          <Image withPlaceholder height={120} />
      </Card.Section>
      <Group position="apart">
          <Title order={3}>{name}</Title>
          <Badge id='review' variant="light">
              Reviews: {reviews}
          </Badge>
      </Group>
      <Text size="sm">Address: {address}</Text>
      <Text size="sm">{distance} km from Airport </Text>
      <Text size="sm">{rating} out of 5</Text>
      <Button fullWidth component={Link} to="/roomdetail">Select</Button>
    </Card>
  );
  }
  
export default PriceItem;