import { configureStore, combineReducers } from '@reduxjs/toolkit';
import SearchBarSlice from './SearchBar/SearchBarSlice';
import { hotelPricesApi } from "./services/hotelPricesApi";
import ChosenDestinationSlice from './SearchBar/chosenDestinationSlice';

const reducers = combineReducers({
    SearchBarReducer:SearchBarSlice,
    [hotelPricesApi.reducerPath]: hotelPricesApi.reducer,
    ChosenDestinationReducer: ChosenDestinationSlice,
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelPricesApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch