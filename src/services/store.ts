import { configureStore, combineReducers } from '@reduxjs/toolkit';
import SearchBarSlice from './SearchBarSlice';
import RoomDetailSlice from './RoomDetailSlice';
import { loadState } from '../Browser-Storage';
import { hotelPricesApi } from "./fetchPricesApi";


const reducers = combineReducers({
    SearchBarReducer:SearchBarSlice,
    RoomDetailReducer:RoomDetailSlice,
    [hotelPricesApi.reducerPath]: hotelPricesApi.reducer,
})

export const store = configureStore({
    devTools:true,
    reducer: reducers,
    // restore the previous state
    preloadedState: loadState(),
    // for prices api
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelPricesApi.middleware),
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch