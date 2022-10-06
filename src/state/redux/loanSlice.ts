import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoanState } from "../../typings";
import { RootState } from "./store";

const initialLoanState: LoanState = {
    loanApplicationList: null,
    selectedLoanApplication: null,
    disbursedLoanList: null,
    selectedDisbursedLoan: null,
};

const loanSlice = createSlice({
    name: "loan",
    initialState: initialLoanState,
    reducers: {
        setLoanState(
            state: LoanState,
            action: PayloadAction<Partial<LoanState>>
        ) {
            let key: keyof LoanState;
            for (key in action.payload) {
                if (action.payload[key]) {
                    if (key === "loanApplicationList") {
                        state[key] = action.payload[key] || state[key];
                    }

                    if (key === "selectedLoanApplication") {
                        state[key] = action.payload[key] || state[key];
                    }

                    if (key === "disbursedLoanList") {
                        state[key] = action.payload[key] || state[key];
                    }

                    if (key === "selectedDisbursedLoan") {
                        state[key] = action.payload[key] || state[key];
                    }
                }
            }

            return state;
        },
        clearLoanState() {
            return initialLoanState;
        },
    },
});

export const loanSelector = (state: RootState) => state.loan;

export const { setLoanState, clearLoanState } = loanSlice.actions;

export default loanSlice.reducer;
