import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpInfoState } from "../typings";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const initialState: SignUpInfoState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
};

const signUpInfoSlice = createSlice({
    name: "signUpInfo",
    initialState,
    reducers: {
        setSignUpInfo(
            state: SignUpInfoState,
            action: PayloadAction<SignUpInfoState>
        ) {
            return action.payload;
        },
        clearSignUpInfo(state: SignUpInfoState) {
            state = initialState;
        },
    },
});

export const signUpInfoSelector = (state: RootState) => state.signUpInfo;

export const { clearSignUpInfo, setSignUpInfo } = signUpInfoSlice.actions;
export default signUpInfoSlice.reducer;
