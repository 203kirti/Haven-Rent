// Importing configureStore from Redux Toolkit to create the Redux store
import { configureStore } from "@reduxjs/toolkit";

// Importing Redux Persist helpers for making the store persistent / saved
import {
  persistStore,     // To create a persistor linked to the store
  persistReducer,   // To wrap our reducer with persistence capabilities
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER // Special action types that need to be ignored in middleware checks
} from "redux-persist" ;

// Default storage mechanism (localStorage for web)
import storage from "redux-persist/lib/storage";

// Importing our main reducer (combined reducer or a slice reducer)
import state from "./state";

// Configuration object for redux-persist
const persistConfig = {
  key: "root",       // Key used to store the persisted data in storage
  version: 1,        // Version of the persisted state
  storage,           // Storage engine (localStorage in this case)
};

// Wrapping our reducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, state);

// Creating the Redux store with persisted reducer and necessary middleware
export const store = configureStore({
  reducer: persistedReducer, // Using the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist uses some non-serializable actions, so we ignore them here
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating a persistor instance which will be used in PersistGate (React integration)
export let persistor = persistStore(store);
