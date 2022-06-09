import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authSlice from "./authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signUpInfoSlice from "./signUpInfoSlice";

const rootReducer = combineReducers({
    modal: modalReducer,
    auth: authSlice,
    signUpInfo: signUpInfoSlice,
});

const persistedReducer = persistReducer(
    {
        key: "root",
        storage,
        blacklist: ["modal", "signUpInfo"],
    },
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
