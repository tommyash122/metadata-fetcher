import { configureStore } from "@reduxjs/toolkit";
import metadataReducer from "./services/metadataSlice";

const store = configureStore({
  reducer: {
    metadata: metadataReducer,
  },
});

export default store;
