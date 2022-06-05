import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


// create slice contains the reducers and the actions
export const searchBarSlice = createSlice({
    name: 'query',
    initialState: {
        id: "",
        location: "",
        lng: 0,
        lat: 0,
        checkIn: 0,
        checkOut: 0,
        adults: 2,
        children: 0,
        rooms: 1,
        test: 0,
        apiQuery: "https://hotelapi.loyalty.dev/api/hotels?destination_id=",
        api: "",
        hotelData: JSON
    },
    reducers: {
        query: (state, action) => {
            state.location = action.payload.dispatchQuery.location;
            state.id = action.payload.dispatchQuery.id;
            state.lng = action.payload.dispatchQuery.lng;
            state.lat = action.payload.dispatchQuery.lat;
            state.checkIn = action.payload.dispatchQuery;
            state.checkOut = action.payload.dispatchQuery.checkIn;
            state.adults = action.payload.checkOut;
            state.children = action.payload.dispatchQuery.children;
            state.rooms = action.payload.dispatchQuery.rooms;
            state.api = state.apiQuery + state.id;
            //console.log(state.id);
            //console.log("api");
            //console.log(state.api);
            // console.log(typeof(state.rooms))
            // console.log(state.checkIn)
        }
    }
});

export const { query } = searchBarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const apiURL = (state: RootState) => state.SearchBarReducer.api;
export const location = (state: RootState) => state.SearchBarReducer.location;

export default searchBarSlice.reducer;
