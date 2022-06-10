import { createSlice } from "@reduxjs/toolkit";
import { RootState} from "./store";


// create slice contains the reducers and the actions
export const searchBarSlice = createSlice({
    name: 'query',
    initialState: {
        locationId: "",
        location: "",
        lng: 0,
        lat: 0,
        checkIn: new Date().getTime(),
        checkOut: new Date().getTime(),
        adults: "2",
        children: "0",
        rooms: "1",
        pageItems: 10,
        pageStart: 0,
        selectHotelId:"",
        hotelData: {
            locationId : "",
            hotels :[]
        },

    },
    reducers: {
        // these take in data from the components 
        query: (state, action) => {
            state.location = action.payload.dispatchQuery.location;
            state.locationId = action.payload.dispatchQuery.id;
            state.lng = action.payload.dispatchQuery.lng;
            state.lat = action.payload.dispatchQuery.lat;
            state.checkIn = action.payload.dispatchQuery.checkIn.getTime();
            state.checkOut = action.payload.dispatchQuery.checkOut.getTime();
            state.adults = action.payload.dispatchQuery.adults;
            state.children = action.payload.dispatchQuery.children;
            state.rooms = action.payload.dispatchQuery.rooms;
            // reset page numbers to 0 but keep the pageItems setting
            state.pageStart = 0; 
            console.log("STORE destination details")
            console.log(state.location);
            console.log(state.locationId);
            console.log(state.lng);
            console.log(state.lat);
            console.log("Date in store")
            console.log(state.checkIn);
            console.log(state.checkOut);
            console.log("STORE Data misc");
            console.log("adults "+state.adults);
            console.log("children "+state.children);
            console.log("rooms " +state.rooms);
            console.log("pageStart "+state.pageStart);
        },
        hotelDataLoad: (state, action) => {
            state.hotelData.hotels = action.payload.hotels;
            state.hotelData.locationId = action.payload.locationId;
            console.log("STORE hotel data");
            console.log(state.hotelData.locationId);   
            console.log(state.hotelData.hotels);
        },
        pageItemsLoad:(state, action) => {
            state.pageItems = action.payload.items;
            console.log("STORE page length");
            console.log(state.pageItems);
        },
        pageStartLoad: (state,action) => {
            state.pageStart = action.payload.start * state.pageItems;
            console.log("STORE page start");
            console.log(state.pageStart);
        },
        selectHotelId: (state,action) =>{
            state.selectHotelId = action.payload.id;
            console.log("STORE selected hotel id");
            console.log(state.selectHotelId);
        },
            
    }
});

// export our actions, these need to be imported by the component so dispatch function in component can send data to STORE
export const { query, hotelDataLoad, pageItemsLoad, pageStartLoad, selectHotelId} = searchBarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const location = (state: RootState) => state.SearchBarReducer.location;

export default searchBarSlice.reducer;
