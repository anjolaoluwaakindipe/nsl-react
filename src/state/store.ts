import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authSlice from './authSlice';

const rootReducer = combineReducers({
    modal: modalReducer,
    auth: authSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
