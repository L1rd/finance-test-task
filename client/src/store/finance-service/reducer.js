import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  finances: [],
  watchingGroup: [],
};

const financesStore = createSlice({
  name: "finances",
  initialState,
  reducers: {
    setFinance: (state, { payload }) => {
      state.finances = payload;
    },
    setToWatchingGroup: (state, { payload }) => {
      state.watchingGroup = payload;
    },
  },
  extraReducers: {},
});

export const { setFinance, setToWatchingGroup } = financesStore.actions;

export default financesStore.reducer;
