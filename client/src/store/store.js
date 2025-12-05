// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";
// import userReducer from "./userslice";
// import { configureStore } from "@reduxjs/toolkit";

// const persistConfig = {
//     key:'user',
//     storage,
    
// }

// const persistedUser = persistReducer(persistConfig, userReducer)

// export const store = configureStore(
//     {
//         reducer: {
//             user: persistedUser
//         }
//     }
// )

// export const persistor = persistStore(store)

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./userslice";
import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "../api/profileslice";

const persistConfig = {
  key: "user",
  storage,
};

const persistedUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUser,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(profileApi.middleware),
});

export const persistor = persistStore(store);
