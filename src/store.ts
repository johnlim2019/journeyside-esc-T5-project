import { configureStore, combineReducers } from '@reduxjs/toolkit';
import SearchBarSlice from './SearchBarSlice';
import { loadState } from './Browser-Storage';

const reducers = combineReducers({
    SearchBarReducer:SearchBarSlice,
})

export const store = configureStore({
    devTools:true,
    reducer: reducers,
    // restore the previous state
    preloadedState: loadState()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch