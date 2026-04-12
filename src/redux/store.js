import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "../redux/slice/productSlice";
import imageReducer from "./slice/ImageSlice";
import listingReducer from "./slice/ListingSlice";
import registertReducer from "./slice/RegisterSlice";
import userReducer from "./slice/UserSlice";
import vendorReducer from "./slice/VendorSlice";

const rootReducer = combineReducers({
  product: productReducer,
  images: imageReducer,
  listing: listingReducer,
  register: registertReducer,
  user: userReducer,
  vendor: vendorReducer,
  blacklist: ["images"],
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
