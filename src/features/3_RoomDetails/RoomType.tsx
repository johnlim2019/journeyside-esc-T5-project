import { Card, Group, Image, Title, Text, Button } from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";

function RoomType(props:any) {
  
  return (
    <Card shadow="md" mt={16} mb={16}>
      <Card.Section mb={16}>
        <Image withPlaceholder height={120} src={ props.data.images && props.data.images[0] && props.data.images[0].url } />
      </Card.Section>
      <Title order={3}>{props.data.description}</Title>
      <Text>Free cancelation: {props.data.free_cancellation.toString()}</Text>
      <Button fullWidth component={Link} to="/BookingData">${props.data.price}</Button>
    </Card>
  );

}

export default RoomType;