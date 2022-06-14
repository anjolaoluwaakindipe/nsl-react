import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authRequest from "../services/requests/authRequest";
import { AuthState } from "../typings";

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
        phoneNumber: "",
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    requestStatus: 0,
};

// state management for logging in a user
export const loginUser = createAsyncThunk(
    "auth/loginUserStatus",
    async (
        { email, password }: { email: string; password: string },
        thunkApi
    ) => {
        try {
            // token response
            const tokenResponse = await authRequest.loginUser(email, password);
            console.log(tokenResponse);

            // check if token response was successful or not
            if (tokenResponse.status === 200) {
                // use access token to get user information
                const userResponse = await authRequest.getUser(
                    tokenResponse.data["access_token"]
                );

                // checks if user info response was successful or not
                if (userResponse.status === 200) {
                    return {
                        ...userResponse.data,
                        accessToken: tokenResponse.data.access_token,
                        refreshToken: tokenResponse.data.refresh_token,
                    };
                }
            } else {
                console.log(tokenResponse.response.status);
                switch (tokenResponse.response.status) {
                    case 0:
                        return thunkApi.rejectWithValue(
                            "A network error occur. Please check your connection"
                        );
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
                    default:
                        return thunkApi.rejectWithValue(
                            "An error occured. Please try again later"
                        );
                }
            }
        } catch (e: any) {
            console.log(e);
            return thunkApi.rejectWithValue(e);
        }
    }
);

// state management for creating a user
export const createUser = createAsyncThunk(
    "auth/createUserStatus",
    async (
        {
            fullName,
            email,
            phoneNumber,
            password,
        }: {
            fullName: string;
            email: string;
            phoneNumber: string;
            password: string;
        },
        thunkAPI
    ) => {
        try {
            // get admin token response
            const adminTokenResponse = await authRequest.getAdminToken();
            console.log(adminTokenResponse);

            // check if admin token response was successful or not
            if (
                adminTokenResponse.status &&
                adminTokenResponse.status === 200
            ) {
                console.log(adminTokenResponse);

                // use the access token of the admin token and user inputed fields to register user
                const registerUserResponse = await authRequest.registerUser({
                    fullName,
                    email,
                    password,
                    phoneNumber,
                    adminToken: adminTokenResponse.data["access_token"],
                });

                console.log(registerUserResponse);

                // check if user registration response was successful or not
                if (registerUserResponse.status === 201) {
                    return {
                        message: "User Creation Successful",
                    };
                } else {
                    switch (registerUserResponse.response.status) {
                        case 0:
                            return thunkAPI.rejectWithValue(
                                "A network error occur. Please check your connection"
                            );
                        case 409:
                            return thunkAPI.rejectWithValue(
                                "User already exists. Please try again with another email"
                            );

                        default:
                            return thunkAPI.rejectWithValue(
                                "Something went wrong when trying to create your account. Please try again later "
                            );
                    }
                }
            } else {
                switch (adminTokenResponse.response.status) {
                    case 0:
                        return thunkAPI.rejectWithValue(
                            "A network error occured. Please check your connection"
                        );
                    case 401:
                        return thunkAPI.rejectWithValue(
                            "We are currently working on our servers please check back later."
                        );
                    case 400:
                        return thunkAPI.rejectWithValue(
                            "Something went wrong while creating your account. Please try again later"
                        );
                    case 500:
                        return thunkAPI.rejectWithValue(
                            "We are current experiencing something wrong with our servers. Please try again later"
                        );
                    default:
                        return thunkAPI.rejectWithValue(
                            "An error occured. Please try again later"
                        );
                }
            }
        } catch (e: any) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

// state action for logging user out
export const logoutUser = createAsyncThunk<
    any,
    undefined,
    { state: RootState }
>("auth/logoutUserStatus", async (_, thunkAPI) => {
    try {
        // const { refreshToken } = thunkAPI.getState().auth;
        // if (refreshToken !== null) {
        //     const logoutResponse = await authRequest.logoutUser({
        //         refreshToken: refreshToken,
        //     });

        //     if (logoutResponse.status && logoutResponse.status === 200) {
        //         return;
        //     } else {
        //         return thunkAPI.rejectWithValue(
        //             "Couldn't communicate with server"
        //         );
        //     }
        // }

        return thunkAPI.fulfillWithValue("yes");
    } catch (e: any) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

// state action for refreshing user tokens

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
        clearAuthState(state: AuthState) {
            return initialState;
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
                state.user!.phoneNumber = action?.payload!.phone_number;
                return state
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                return state
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
                return state
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                return state
            })
            .addCase(createUser.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state = { ...initialState };
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                console.log(action.payload);
                state = initialState;
                state.errorMessage = action.payload as string;
            });
    },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
