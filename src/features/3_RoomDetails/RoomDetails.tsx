import { Title, Text, Loader, Space, Center, Container, Card } from "@mantine/core";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import RoomType from "./RoomType";
import React from "react";
import { useAppSelector } from "../../services/hooks";

const mapHeight = 360;
function getMapDetails(obj:any){
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
  console.log(selectedHotelObj);
  console.log(selectedHotelId);
  let longitude:number; let latitude:number;
  [longitude, latitude] = getMapDetails(selectedHotelObj);

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
      <Title order={2}>{selectedHotelObj.name}</Title><Space h="sm" />
      <Card shadow="sm" p={0} sx={{overflow:"hidden"}}>
        <Wrapper apiKey={"AIzaSyD-rkaoiosPhv8ZlFaXDLESTXKLCMdYbPI"} render={render}/>
      </Card>
      
      <Space h="md" />
      <Title order={3}>Rooms List</Title>
      <RoomType />
      {/* <RoomType />
      <RoomType />
      <RoomType /> */}
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