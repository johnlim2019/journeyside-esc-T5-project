import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface userKey {
    userKey:string,
    login : boolean

}
const initialState:userKey = {
    userKey: "",
    login:false
}

export const userKeySlice = createSlice({
    name: 'userKeySlice',
    initialState: initialState,
    reducers: {
        login: (state,action) => {
            state.userKey = action.payload.userKey;
            state.login = true;
        },
        logout: (state) => {
            state.userKey = "";
            state.login = false;
        },

    }
});

export const { login, logout } = userKeySlice.actions;
// export const location = (state: RootState) => state.userKeyReducer.location;

export default userKeySlice.reducer;