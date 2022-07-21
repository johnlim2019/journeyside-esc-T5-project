import { Card, Image, Title, Text, Button, List, ThemeIcon, Grid, Divider, Space } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconCheck, IconCoffee, IconCoffeeOff } from "@tabler/icons";
import { selectRoom } from '../../services/RoomDetailSlice';
import { useAppDispatch } from "../../services/hooks";

function RoomType(props: any) {

  const dispatch = useAppDispatch();

  return (
    <Card shadow="md" mt={16} mb={16}>
      <Card.Section mb={16}>
        <Image withPlaceholder height={240} src={props.data.images && props.data.images[0] && props.data.images[0].url} />
      </Card.Section>
      <Title order={3}>{props.data.description}</Title>
      <Space h="sm" />
      {
        props.data.subtypes.map((d: any) => {
          return (<>
            <Divider />
            <Space h="sm" />
            <Grid>
              <Grid.Col span={6}>
                <List mt={8} mb={16} center spacing="xs">

                  { // BREAKFAST
                    d.breakfastInfo.includes("room_only") === false ?
                      <List.Item icon={<ThemeIcon color="teal" radius="xl"><IconCoffee size={16} /></ThemeIcon>}>
                        Includes Breakfast
                      </List.Item> :
                      <List.Item icon={<ThemeIcon color="yellow" radius="xl"><IconCoffeeOff size={16} /></ThemeIcon>}>
                        Room Only
                      </List.Item>
                  }
                  { // FREE CANCELATION
                    d.free_cancellation ?
                      <List.Item icon={<ThemeIcon color="teal" radius="xl"><IconCheck size={16} /></ThemeIcon>}>
                        Free Cancelation
                      </List.Item> :
                      <List.Item icon={<ThemeIcon color="yellow" radius="xl"><IconCheck size={16} /></ThemeIcon>}>
                        No Free Cancelation
                      </List.Item>
                  }

                </List>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text sx={{ fontSize: "2em" }} align="right">${d.price}</Text>
                <Text align="right">+{d.points} points</Text>
                <Text align="right" color="dimmed">per night per room</Text>
              </Grid.Col>
              <Grid.Col xs={4} md={2}>
                <Button mt={8} fullWidth onClick={() => dispatch(selectRoom({ key: d.key }))} component={Link} to="/BookingData">Select</Button>
              </Grid.Col>
            </Grid>
            <Space h="sm" />
          </>
          )
        })
      }
    </Card>
  );

}

export default RoomType;