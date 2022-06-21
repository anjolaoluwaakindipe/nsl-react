import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signUpInfoReducer from "./signUpInfoSlice";

const rootReducer = combineReducers({
    modal: modalReducer,
    auth: persistReducer(
        {
            key: "auth",
            storage,
            blacklist: ["isLoading", "errorMessage", "isError", "isSuccess"],
        },
        authReducer
    ),
    signUpInfo: signUpInfoReducer,
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
    // middleware: getDefaultMiddleware({serializableCheck:false})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
