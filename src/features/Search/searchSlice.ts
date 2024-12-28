import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the state interface
export interface SearchState {
  value: string;
}

// Initial state
const initialState: SearchState = {
  value: "",
};

// Create the slice
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Export the actions and reducer
export const { searchValue } = searchSlice.actions;
export default searchSlice.reducer;
