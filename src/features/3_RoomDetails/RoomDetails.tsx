import { Title, Text, Loader, Space, Center, Container, Card, List, ThemeIcon, Divider, Group } from "@mantine/core";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import RoomType from "./RoomType";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { setLoading, compileRoomData } from "../../services/RoomDetailSlice";
import axios from "axios";
import { IconMapPin, IconMap, IconLuggage, IconMoon, IconUsers, IconBed } from "@tabler/icons";
import { getUrlDates } from "../2_SearchResults/SearchBar/SearchBar";
// import { selectHotelId } from "../../services/SearchBarSlice";

const mapHeight = 200;
export function getMapDetails(obj: any) {
  if (obj == null) {
    console.error("null object does not have map details");
    return [0, 0];
  }
  const longitude: number = obj.longitude;
  const latitude: number = obj.latitude;
  return [longitude, latitude];
}


function RoomDetails() {
  // Load details 
  const selectedHotelId = useAppSelector(state => state.SearchBarReducer.selectHotelId); // to load things from store !!!
  const locationId = useAppSelector(state => state.SearchBarReducer.locationId); // to load things from store !!!
  const checkInObj = new Date(useAppSelector(state => state.SearchBarReducer.checkIn));
  console.log(checkInObj.toLocaleDateString());
  const checkIn = getUrlDates(checkInObj);
  console.log(checkIn);
  const checkOutObj = new Date(useAppSelector(state => state.SearchBarReducer.checkOut));
  const checkOut = getUrlDates(checkOutObj);
  const selectedHotelObj = useAppSelector(state => state.SearchBarReducer.selectHotelObj);
  const nightsNum = (checkOutObj.getTime() - checkInObj.getTime()) / 86400000;
  // console.log(selectedHotelObj);
  // console.log(selectedHotelId);
  let longitude: number; let latitude: number;
  [longitude, latitude] = getMapDetails(selectedHotelObj);
  const adults = useAppSelector(state => state.SearchBarReducer.adults);
  const children = useAppSelector(state => state.SearchBarReducer.children);
  const rooms = useAppSelector(state => state.SearchBarReducer.rooms);
  const dispatch = useAppDispatch();

  // Call state manager for rooms list
  let roomsList = useAppSelector(state => state.RoomDetailReducer.roomsList);
  let isLoading = useAppSelector(state => state.RoomDetailReducer.isLoading);

  useEffect(() => {
    // const roomPriceApi = './rooms/diH7.json';
    const roomPriceApi = "https://us-central1-t5-esc-ascendas-hotels.cloudfunctions.net/app/hotels/" + selectedHotelId + "/price?destination_id=" + locationId + "&checkin=" + checkIn + "&checkout=" + checkOut + "&lang=en_US&currency=SGD&country_code=SG&guests=" + 2 + "&partner_id=1";
    console.log(roomPriceApi);
    // const roomPriceApi = 'https://hotelapi.loyalty.dev/api/hotels/'+selectedHotelId+'/price?destination_id=RsBU&checkin=2022-07-31&checkout=2022-08-01&lang=en_US&currency=SGD&partner_id=16&country_code=SG&guests=2';
    dispatch(setLoading({ loading: true }));
    axios.get(roomPriceApi).then((response) => {
      dispatch(compileRoomData({ data: response.data }));
      dispatch(setLoading({ loading: false }));
    }).catch(errors => {
      console.error(errors);
      dispatch(setLoading({ loading: false }));

    });;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // To be adjusted based on previous data
  const zoom = 16;
  const center: google.maps.LatLngLiteral = {
    lat: latitude, lng: longitude
  }
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <Center sx={{ height: mapHeight }}><Loader /></Center>
      case Status.FAILURE:
        return <Text>Error</Text>
      case Status.SUCCESS:
        return <Map center={center} zoom={zoom}><Marker position={center} /></Map>
    }
  }

  return (
    <Container mt={20}>
      <Card shadow="sm" p={0} mb={20} sx={{ overflow: "hidden" }}>
        <Wrapper apiKey={"AIzaSyD-rkaoiosPhv8ZlFaXDLESTXKLCMdYbPI"} render={render} />
      </Card>
      <Title order={2}>{selectedHotelObj.name}</Title><Space h="sm" />
      <List center spacing="xs">
        <List.Item id="hotel-address" icon={<ThemeIcon radius="xl"><IconMap size={16} /></ThemeIcon>}>
          Address: {selectedHotelObj.address}
        </List.Item>
        <List.Item id="hotel-coordinates" icon={<ThemeIcon radius="xl"><IconMapPin size={16} /></ThemeIcon>}>
          Lat: {selectedHotelObj.latitude}, Lng: {selectedHotelObj.longitude}
        </List.Item>
        <List.Item icon={<ThemeIcon radius='xl'><IconMoon size={16} /></ThemeIcon>}>
          {checkInObj.toLocaleDateString()} to {checkOutObj.toLocaleDateString()} for {nightsNum} night(s)
        </List.Item>
        <List.Item icon={<ThemeIcon radius='xl'><IconUsers size={16}/></ThemeIcon>}>
          Adults: {adults} Children: {children}
        </List.Item>
        <List.Item icon={<ThemeIcon radius='xl'><IconBed size={16}/></ThemeIcon>}>
          Rooms: {rooms}
        </List.Item>
      </List>

      <Space h="md" />
      <Divider />
      <Space h="sm" />
      <Title order={3}>Room Options</Title>
      {
        isLoading ? <Center p="lg"><Loader /></Center> :
          Object.keys(roomsList).map((data: any, key) => {
            return <RoomType key={key} data={roomsList[data]} />
          })
      }
      {/* <RoomType data={roomsList[0]} /> */}
    </Container>
  );
}

function Map({
  children,
  center,
  zoom,
}: {
  children?: React.ReactNode;
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map, center, zoom]);

  return (
    <>
      <div ref={ref} style={{ height: mapHeight }} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>);
}

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default RoomDetails;