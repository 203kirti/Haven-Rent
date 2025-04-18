import { createSlice } from "@reduxjs/toolkit";
// createSlice, a helper from Redux Toolkit that bundles together action types, action creators, reducers , into one simple object.

//  This defines the initial values for the user slice of the Redux store:
const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user", // the slice name (used in actions)
  initialState, // your initial data
  reducers: {
    //  // functions that define how to update the state
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setListings,
  setTripList,
  setWishList,
  setPropertyList,
  setReservationList,
} = userSlice.actions;

export default userSlice.reducer;
// userSlice.reducer: is the actual reducer function that will add to the Redux store.
