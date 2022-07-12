import { configureStore, combineReducers } from '@reduxjs/toolkit';
import SearchBarSlice from './SearchBarSlice';
import RoomDetailSlice from './RoomDetailSlice';
import { loadSession, loadState } from '../Browser-Storage';
// import { hotelPricesApi } from "./fetchPricesApi";
import UserDetailsSlice from './UserDetailsSlice';

const SEARCHBARKEY = "SearchBarSlice";
const USERDETAILSKEY = "UserDetailsReducer";

const reducers = combineReducers({
    SearchBarReducer:SearchBarSlice,
    RoomDetailReducer:RoomDetailSlice,
    UserDetailsReducer:UserDetailsSlice,
    // [hotelPricesApi.reducerPath]: hotelPricesApi.reducer,
})

export const store = configureStore({
    devTools:true,
    reducer: reducers,
    preloadedState: {
        SearchBarReducer:loadState(SEARCHBARKEY),
        UserDetailsReducer:loadSession(USERDETAILSKEY)
    },
    // for prices api
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(hotelPricesApi.middleware),
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
