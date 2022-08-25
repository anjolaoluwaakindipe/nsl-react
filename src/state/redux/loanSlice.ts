import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "react-query/types/core/query";
import { LoanState } from "../../typings";
import { RootState } from './store';



const initialLoanState: LoanState = {
    loanList: null,
    selectedLoan: null,
};

const loanSlice = createSlice({
    name: "loan",
    initialState: initialLoanState,
    reducers: {
        setListState(
            state: LoanState,
            action: PayloadAction<Partial<LoanState>>
        ) {
             let key: keyof LoanState;
            for (key in action.payload) {
               
                if (action.payload[key]) {
                    if (key === "loanList") {
                        state[key] = action.payload[key] || state[key];
                    }

                    if (key=== "selectedLoan") {
                        state[key] = action.payload[key] || state[key];
                    }
                }
            }

            return state
        },
    },
});

export const loanSelector = (state: RootState) => state.loan;


export const {setListState} = loanSlice.actions;

export default loanSlice.reducer;
