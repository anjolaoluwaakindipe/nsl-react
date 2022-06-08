import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authRequest from "../services/requests/authRequest";
import { AuthState } from "../typings";

import { cleanup } from "@testing-library/react";
import { RootState } from "./store";

const initialState: AuthState = {
    accessToken: "",
    refreshToken: "",
    user: {
        email: "",
        email_verified: false,
        family_name: "",
        given_name: "",
        name: "",
        preferred_username: "",
        sub: "",
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    requestStatus: 0,
};

export const loginUser = createAsyncThunk(
    "auth/loginUserStatus",
    async (
        { email, password }: { email: string; password: string },
        thunkApi
    ) => {
        try {
            const tokenResponse = await authRequest.loginUser(email, password);
            console.log(tokenResponse);
            if (tokenResponse.status === 200) {
                const userResponse = await authRequest.getUser(
                    tokenResponse.data["access_token"]
                );

                if (userResponse.status === 200) {
                    return {
                        ...userResponse.data,
                        accessToken: tokenResponse.data.access_token,
                        refreshToken: tokenResponse.data.refresh_token,
                    };
                }
            } else {
                console.log(tokenResponse.response.status)
                switch (tokenResponse.response.status) {
                    case 401:
                        return thunkApi.rejectWithValue(
                            "Invalid Email or Password"
                        );
                    case 400:
                        return thunkApi.rejectWithValue(
                            "A bad request occured"
                        );
                    case 500:
                        return thunkApi.rejectWithValue(
                            "Something went wrong with our servers please try again later"
                        );
                }
                
            }
        } catch (e: any) {
            console.log(e);
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUserStatus",
    async (_, thunkAPI) => {}
);

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthState(
            state: AuthState,
            action: PayloadAction<{ refresToken: string; token: string }>
        ) {
            state.refreshToken = action.payload.refresToken;
            state.accessToken = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.accessToken = action?.payload!.accessToken;
                state.refreshToken = action?.payload!.refreshToken;
                state.user!.name = action?.payload!.name;
                state.user!.email = action?.payload!.email;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload as string
            });
    },
});

export const { setAuthState } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
