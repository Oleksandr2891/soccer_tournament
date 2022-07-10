import { createSlice } from "@reduxjs/toolkit";

export const teamsNames = [];

const initialState = {
  teamsNames,
};

export const tableTeamName = createSlice({
  name: "teamsNames",
  initialState,
  reducers: {
    addNewTeam(state, action) {
      state.teamsNames.push(action.payload);
    },
  },
});

export default tableTeamName.reducer;
export const { addNewTeam } = tableTeamName.actions;
