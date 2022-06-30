import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpInfoState } from "../typings";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const initialState: SignUpInfoState = {
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: { value: "", label: "" },
    bvn: "",
    dateOfBirth: "",
    lastName: "",
    emailCode: "",
    smsCode: "",
};

const signUpInfoSlice = createSlice({
    name: "signUpInfo",
    initialState,
    reducers: {
        setSignUpInfo(
            state: SignUpInfoState,
            action: PayloadAction<{
                firstName: string;
                email: string;
                gender: {value:string; label:string} | undefined;
                bvn: string; 
                dateOfBirth: string;
                lastName: string;
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
            state.emailCode = action.payload.emailCode;
        },
        setSmsCode(
            state: SignUpInfoState,
            action: PayloadAction<{
                smsCode: string;
            }>
        ) {
            state.smsCode = action.payload.smsCode;
        },
        clearSignUpInfo(state: SignUpInfoState) {
            state.email = "";
            state.firstName = "";
            state.lastName = "";
            state.gender = undefined;
            state.dateOfBirth = "";
            state.bvn = "";
            state.password = "";
            state.phoneNumber = "";
        },
    },
});

export const signUpInfoSelector = (state: RootState) => state.signUpInfo;

export const { clearSignUpInfo, setSignUpInfo, setEmailCode, setSmsCode } =
    signUpInfoSlice.actions;
export default signUpInfoSlice.reducer;
