import { createSlice } from "@reduxjs/toolkit";
// createSlice, a helper from Redux Toolkit that bundles together action types, action creators, reducers , into one simple object. 


//  This defines the initial values for the user slice of the Redux store:
const initialState = {  
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",   // the slice name (used in actions)
  initialState,    // your initial data
  reducers: {      //  // functions that define how to update the state
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  }
});

export const { setLogin  // setLogin: is the action creator for triggering a login.
    
} = userSlice.actions;

export default userSlice.reducer;
// userSlice.reducer: is the actual reducer function that will add to the Redux store.