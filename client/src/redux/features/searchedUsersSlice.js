import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedUsers: [],
  isSearchingUsers: false
}

const serachedUsersSlice = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.searchedUsers = []
    },
    setSearchedUsers: (state, action) => {
      const data = action.payload;
      state.searchedUsers = data;
    },
    setIsSearchingUsers: (state, action) => {
      state.isSearchingUsers = action.payload;
    }
    // selectsearchedUsers: (state, action) => {
    //     state.selectedsearchedUsers = action.payload;
    // }
  }
});

export const { clearUsers, setSearchedUsers, setIsSearchingUsers } = serachedUsersSlice.actions;
export default serachedUsersSlice.reducer;