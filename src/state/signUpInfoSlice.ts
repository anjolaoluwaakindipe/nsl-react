import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpInfoState } from "../typings";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const initialState: SignUpInfoState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    emailCode: "",
    smsCode: ''
};

const signUpInfoSlice = createSlice({
    name: "signUpInfo",
    initialState,
    reducers: {
        setSignUpInfo(
            state: SignUpInfoState,
            action: PayloadAction<{
                email: string;
                fullName: string;
                password: string;
                phoneNumber: string;
            }>
        ) {
            return { ...state, ...action.payload };
        },
        setEmailCode(
            state: SignUpInfoState,
            action: PayloadAction<{
                emailCode: string;
               
            }>
        ) {
            state.emailCode = action.payload.emailCode
        },
        setSmsCode(state: SignUpInfoState,
            action: PayloadAction<{
                smsCode: string;
               
            }>){
            state.smsCode = action.payload.smsCode
        },
        clearSignUpInfo(state: SignUpInfoState) {
            state.email = "";
            state.fullName = "";
            state.password = "";
            state.phoneNumber = "";
        },
    },
});

export const signUpInfoSelector = (state: RootState) => state.signUpInfo;

export const { clearSignUpInfo, setSignUpInfo, setEmailCode,setSmsCode } = signUpInfoSlice.actions;
export default signUpInfoSlice.reducer;
