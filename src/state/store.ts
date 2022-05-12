import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";

const rootReducer = combineReducers({
    modal: modalReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
