import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface searchBarInterface {
    locationId: string,
    location: string,
    lng: number,
    lat: number,
    checkIn: number,
    checkOut: number,
    adults: string,
    children: string,
    rooms: string,
    pageItems: number,
    pageStart: number,
    selectHotelId: string,
    selectHotelObj: any,
    sortByCat: string,
    isLoading: boolean,
    hotelData: {
        locationId: string,
        hotels: any[],
    },
    destinationsObjLs: any[],
    autocompleteLs: string[],
}
const initialState = {
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
    pageStart: 1,
    selectHotelId: "",
    selectHotelObj: null,
    sortByCat: "Reviews",
    isLoading: false,
    hotelData: {
        locationId: "NO",
        hotels: [],
    },
    destinationsObjLs: [],
    autocompleteLs: [],
} as searchBarInterface;


// create slice contains the reducers and the actions
export const searchBarSlice = createSlice({
    name: 'hotelData',
    initialState,
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
            console.log("STORE destination details")
            console.log(state.location);
            console.log(state.locationId);
            console.log(state.lng);
            console.log(state.lat);
            console.log("Date in store")
            console.log(state.checkIn);
            console.log(state.checkOut);
            console.log("STORE Data misc");
            console.log("adults " + state.adults);
            console.log("children " + state.children);
            console.log("rooms " + state.rooms);
            console.log("pageStart " + state.pageStart);
        },
        pageItemsLoad: (state, action) => {
            state.pageItems = action.payload.items;
            console.log("STORE page length");
            console.log(state.pageItems);
        },
        pageStartLoad: (state, action) => {
            state.pageStart = action.payload.start;
            console.log("STORE page start");
            console.log(state.pageStart);
        },
        selectHotelId: (state, action) => {
            state.selectHotelId = action.payload.id;
            console.log("STORE selected hotel id");
            console.log(state.selectHotelId);
            for (let i = 0; i < state.hotelData.hotels.length; i++) {
                if (state.hotelData.hotels[i]["id"] === action.payload.id) {
                    state.selectHotelObj = state.hotelData.hotels[i];
                    // console.log(state.selectHotelObj);
                    break
                }
            }
        },
        setCategory: (state, action) => {
            state.sortByCat = action.payload.category;
            console.log("STORE category");
            console.log(state.sortByCat);
        },
        setDestinations: (state, action) => {
            state.destinationsObjLs = action.payload.dest;
            console.log("STORE destinations");
            console.log(state.destinationsObjLs);
            var destinations = action.payload.dest;
            var destLs: string[] = [];
            for (let i = 0; i < destinations?.length; i++) {
                destLs.push(destinations[i]['term']);
            }
            state.autocompleteLs = destLs;
            console.log(state.autocompleteLs);
        },
        compileHotelData: (state, action) => {
            console.log("COMPILED hotel DATA");
            let hotelByDestData = action.payload.hotels;
            let hotelPricesData = action.payload.prices;
            var list: any[] = [];
            for (let i = 0; i < hotelPricesData.length; i++) {
                // console.log(action.payload.prices[i].id);
                var currObj: any = {};
                let convertedPrice = hotelPricesData[i].converted_price;
                if (typeof hotelPricesData[i].market_rates != 'undefined') {
                    if (hotelPricesData[i].market_rates.length > 0) {
                        for (let k = 0; k < hotelPricesData[i].market_rates.length; k++) {
                            convertedPrice = hotelPricesData[i]["market_rates"][k]["rate"];

                        }
                    }
                }
                let hotelId = hotelPricesData[i].id;
                for (let j = 0; j < hotelByDestData.length; j++) {
                    if (hotelByDestData[j].id === hotelId) {
                        currObj = { ...currObj, ...hotelByDestData[j] };
                        currObj = { ...currObj, ...hotelPricesData[i] };
                        currObj['converted_price'] = convertedPrice;
                        list.push(currObj);
                    }
                }
            }
            console.log(list);
            state.hotelData.locationId = action.payload.id;
            state.hotelData.hotels = list;
            console.log(state.hotelData.hotels);
        },
        setHotelData :(state,action)=>{
            state.hotelData.hotels = action.payload.hotels;
        },
        setLoading: (state, action) => {
            console.log("loading " + action.payload.loading);
            state.isLoading = action.payload.loading;
        },
    }
});

// export our actions, these need to be imported by the component so dispatch function in component can send data to STORE
export const { setHotelData, query, pageItemsLoad, pageStartLoad, selectHotelId, setCategory, setDestinations, compileHotelData, setLoading } = searchBarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const location = (state: RootState) => state.SearchBarReducer.location;

export default searchBarSlice.reducer;
