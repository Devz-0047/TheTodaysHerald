import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/Search/searchSlice";
import genreReducer from "../features/Search/genreSlice"
export const store = configureStore({
  reducer: {
    search: searchReducer,
    genre: genreReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
