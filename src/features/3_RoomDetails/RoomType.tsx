import { Card, Image, Title, Text, Button, List, ThemeIcon, Grid } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconCheck, IconCoffee, IconCoffeeOff } from "@tabler/icons";

function RoomType(props:any) {
  
  return (
    <Card shadow="md" mt={16} mb={16}>
      <Card.Section mb={16}>
        <Image withPlaceholder height={240} src={ props.data.images && props.data.images[0] && props.data.images[0].url } />
      </Card.Section>
      <Grid>
        <Grid.Col span={8}>
          <Title order={3}>{props.data.description}</Title>
          <List mt={12} mb={16} center spacing="xs">

            { // FREE CANCELATION
              props.data.free_cancellation ? 
              <List.Item icon={<ThemeIcon color="teal" radius="xl"><IconCheck size={16}/></ThemeIcon>}>
                Free Cancelation
              </List.Item> : 
              <List.Item icon={<ThemeIcon color="yellow" radius="xl"><IconCheck size={16}/></ThemeIcon>}>
                No Free Cancelation
              </List.Item>
            }
            
            { // BREAKFAST
              props.data.roomAdditionalInfo.breakfastInfo === "hotel_detail_breakfast_included" ? 
              <List.Item icon={<ThemeIcon color="teal" radius="xl"><IconCoffee size={16}/></ThemeIcon>}>
                Includes Breakfast
              </List.Item> : 
              <List.Item icon={<ThemeIcon color="yellow" radius="xl"><IconCoffeeOff size={16}/></ThemeIcon>}>
                Room Only
              </List.Item>
            }

          </List>
        </Grid.Col>
        <Grid.Col span={4}>
            <Text sx={{fontSize: "2em"}} align="right">${props.data.price}</Text>
            <Text align="right">+{props.data.points} points</Text>
            <Text align="right" color="dimmed">per night per room</Text>
        </Grid.Col>
      </Grid>
      
      <Button fullWidth component={Link} to="/BookingData">Select</Button>
    </Card>
  );

}

export default RoomType;