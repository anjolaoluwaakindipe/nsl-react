import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice';
import cardReducer from './cardSlice';
import loanReducer from './loanSlice';
import modalReducer from './modalSlice';
import signUpInfoReducer from './signUpInfoSlice';

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
    loan: loanReducer,
    card: cardReducer,
});

const persistedReducer = persistReducer(
    {
        key: "root",
        storage,
        blacklist: ["modal", "signUpInfo", "loan", "card"],
    },
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware({serializableCheck:false})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
