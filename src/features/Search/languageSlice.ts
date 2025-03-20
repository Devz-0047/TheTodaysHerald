import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the state interface
export interface languageState {
  value: string;
}

// Initial state
const initialState: languageState = {
  value: "en",
};

// Create the slice
export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    languageValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Export the actions and reducer
export const { languageValue } = languageSlice.actions;
export default languageSlice.reducer;
