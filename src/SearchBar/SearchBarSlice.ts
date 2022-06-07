import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


// create slice contains the reducers and the actions
export const searchBarSlice = createSlice({
    name: 'query',
    
    initialState: {
        locationId: "",
        location: "",
        lng: 0,
        lat: 0,
        checkIn: 0,
        checkOut: 0,
        adults: 2,
        children: 0,
        rooms: 1,
        test: 0,
        apiQuery: "./",
        api: "",
        hotelData: [],
        pageItems: 10,
        pageStart:0,
        selectHotelId:""
    },
    reducers: {
        // these take in data from the components 
        query: (state, action) => {
            state.location = action.payload.dispatchQuery.location;
            state.locationId = action.payload.dispatchQuery.id;
            state.lng = action.payload.dispatchQuery.lng;
            state.lat = action.payload.dispatchQuery.lat;
            state.checkIn = action.payload.dispatchQuery;
            state.checkOut = action.payload.dispatchQuery.checkIn;
            state.adults = action.payload.checkOut;
            state.children = action.payload.dispatchQuery.children;
            state.rooms = action.payload.dispatchQuery.rooms;
            state.api = state.apiQuery + state.locationId +'.json';
            //console.log(state.id);
            //console.log("api");
            //console.log(state.api);
            // console.log(typeof(state.rooms))
            // console.log(state.checkIn)
        },
        hotelDataLoad: (state, action) => {
            state.hotelData = action.payload.hotelData;
            console.log("STORE hotel data");
            console.log(state.hotelData);   
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
        sortReviews: (state) => {

        }

        
    }
});

// export our actions, these need to be imported by the component so dispatch function in component can send data to STORE
export const { query, hotelDataLoad, pageItemsLoad, pageStartLoad, selectHotelId} = searchBarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const apiURL = (state: RootState) => state.SearchBarReducer.api;
export const location = (state: RootState) => state.SearchBarReducer.location;

export default searchBarSlice.reducer;
