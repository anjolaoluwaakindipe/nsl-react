import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CardState } from "../../typings";
import { RootState } from "./store";

const initialCardState: CardState = {
    cardList: null,
    isError: false,
    isLoading: false,
    selectedCard: null
};

const cardSlice = createSlice({
    name: "card",
    initialState: initialCardState,
    reducers: {
        setCardState(
            state: CardState,
            action: PayloadAction<Partial<CardState>>
        ) {
            let key: keyof CardState;

            for (key in action.payload) {
                if (action.payload[key] !== undefined) {
                    if (key === "cardList") {
                        state[key] = action.payload[key] || state[key];
                    }
                    if (key === "selectedCard") {
                        state[key] = action.payload[key] || state[key];
                    }
                    if (key === "isError") {
                        state[key] = action.payload[key] ? true : false;
                    }
                    if (key === "isLoading") {
                        state[key] = action.payload[key] ? true : false;
                    }
                }
            }
        },
        clearCardState() {
            return initialCardState;
        },
    },
});

export const cardSelector = (state: RootState) => state.card;

export const { clearCardState, setCardState } = cardSlice.actions;

export default cardSlice.reducer;
