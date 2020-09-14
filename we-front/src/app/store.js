import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../modules/ItemModule";

export default configureStore({
  reducer: {
    item: itemReducer,
  },
});
