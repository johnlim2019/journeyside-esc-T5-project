import { Title, Text, Loader, Space, Center, Container, Card, List, ThemeIcon } from "@mantine/core";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import RoomType from "./RoomType";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { setLoading, compileRoomData } from "../../services/RoomDetailSlice";
import axios from "axios";
import { IconMapPin, IconMap } from "@tabler/icons";

const mapHeight = 200;
export function getMapDetails(obj:any){
  if (obj == null){
    console.error("null object does not have map details");
    return [0,0];
  }
  const longitude:number = obj.longitude;
  const latitude:number = obj.latitude;
  return [longitude,latitude];
}


function RoomDetails() {
  // Load details 
  const selectedHotelId = useAppSelector(state => state.SearchBarReducer.selectHotelId); // to load things from store !!!
  const selectedHotelObj = useAppSelector(state => state.SearchBarReducer.selectHotelObj);
  // console.log(selectedHotelObj);
  // console.log(selectedHotelId);
  let longitude:number; let latitude:number;
  [longitude, latitude] = getMapDetails(selectedHotelObj);
  const dispatch = useAppDispatch();

  // Call state manager for rooms list
  let roomsList = useAppSelector(state => state.RoomDetailReducer.roomsList);
  let isLoading = useAppSelector(state => state.RoomDetailReducer.isLoading);

  useEffect(() => {
    const tempHotelId = 'diH7';
    const roomPriceApi = 'https://ascendahotels.mocklab.io/api/hotels/'+tempHotelId+'/prices/ean';
    dispatch(setLoading({ loading: true }));
    axios.get(roomPriceApi).then((response) => {
      console.log(selectedHotelObj);
      console.log(response.data.rooms);
      dispatch(compileRoomData({ data : response.data}));
      dispatch(setLoading({ loading: false }));
    }).catch(errors => {
      console.error(errors);
      dispatch(setLoading({ loading: false }));
    });;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // To be adjusted based on previous data
  const zoom = 16;
  const center:google.maps.LatLngLiteral = {
    lat:latitude, lng:longitude
  }
  const render = (status:Status) => {
    switch (status){
      case Status.LOADING:
        return <Center sx={{height:mapHeight}}><Loader/></Center>
      case Status.FAILURE:
        return <Text>Error</Text>
      case Status.SUCCESS:
        return <Map center={center} zoom={zoom}><Marker position={center} /></Map>
    }
  }

  return (
    <Container mt={20}>
      <Card shadow="sm" p={0} mb={20} sx={{overflow:"hidden"}}>
        <Wrapper apiKey={"AIzaSyD-rkaoiosPhv8ZlFaXDLESTXKLCMdYbPI"} render={render}/>
      </Card>
      <Title order={2}>{selectedHotelObj.name}</Title><Space h="sm" />
      <List center spacing="xs">
        <List.Item icon={<ThemeIcon radius="xl"><IconMap size={16}/></ThemeIcon>}>
          Address: {selectedHotelObj.address}
        </List.Item>
        <List.Item icon={<ThemeIcon radius="xl"><IconMapPin size={16}/></ThemeIcon>}>
          Lat: {selectedHotelObj.latitude}, Lng: {selectedHotelObj.longitude}
        </List.Item>
      </List>
      
      <Space h="md" />
        {
          isLoading ? <Center p="lg"><Loader/></Center> :
          roomsList.map((data, key) => {
            return <RoomType key={key} data={data} />
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
}){
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {center, zoom}));
    }
  }, [ref, map, center, zoom]);

  return (
  <>
    <div ref={ref} style={{height:mapHeight}} />
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