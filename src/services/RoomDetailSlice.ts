import { createSlice } from "@reduxjs/toolkit";
import { RootState} from "./store";

interface selectedHotel {
    isLoading:boolean,
    sortBy:string,
    roomsList:any[]
}
const initialState:selectedHotel = {
    isLoading:false,
    sortBy:"price",
    roomsList:[]
}

export const selectedHotelSlice = createSlice({
    name: 'selectedHotel',
    initialState: initialState,
    reducers: {
        compileRoomData: (state,action) => {
            state.roomsList = action.payload.data.rooms;
        },
        setLoading: (state,action) => {
            // console.log("loading "+action.payload.loading);
            state.isLoading = action.payload.loading;
        }
    }
});

export const { compileRoomData, setLoading } = selectedHotelSlice.actions;
export default selectedHotelSlice.reducer;