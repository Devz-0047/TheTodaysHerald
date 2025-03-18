import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the state interface
export interface GenreState {
  value: string;
}

// Initial state
const initialState: GenreState = {
  value: "",
};

// Create the slice
export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    genreValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Export the actions and reducer
export const { genreValue } = genreSlice.actions;
export default genreSlice.reducer;
