import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matches: [],
};

export const dataMatches = createSlice({
  name: "matches",
  initialState,
  reducers: {
    createNewMatchScore(state, { payload }) {
      state.matches[payload.match - 1] = payload;
      return state;
    },
  },
});

export default dataMatches.reducer;
export const { createNewMatchScore } = dataMatches.actions;
