import { createSlice } from "@reduxjs/toolkit";

// create slice contains the reducers and the actions
export const SearchItemSlice = createSlice({
    name:'hotels',
    initialState: {
        hotelLs: [],
        api: null
    },
    reducers:{
        loadLs: (state, action) => {
            state.api = action.payload.api;
            console.log("Searchitem");
            console.log(state.api);
        }
        
    }
});

export const {loadLs} = SearchItemSlice.actions;

export default SearchItemSlice.reducer;
