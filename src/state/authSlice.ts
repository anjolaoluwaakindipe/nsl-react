import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authRequest from "../services/requests/authRequest";
import { AuthState, UserInfoAppResponse } from "../typings";

import { RootState } from "./store";
import toast from 'react-hot-toast';

const initialState: AuthState = {
    accessToken: "",
    refreshToken: "",
    user: {
        title: "",
        customerNo: "",
        name: "",
        firstName: "",
        lastName: "",
        middleName: "",
        maritalStatus: "",
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
        email: "",
        bvn: "",
        residentialAddress: "",
        cscsNumber: "",
        identificationDocType: "",
        identificationDocRef: "",
        identificationIssueDate: "",
        identificationDocExpiryDate: "",
        identificationDocumentImage: "",
        proofOfAddressImage: "",
        picture: "",
        employmentInfo: {
            
        }
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    requestStatus: 0,
};

// Register User on both the application and keycloak
export const createUserFull = createAsyncThunk(
    "auth/createUserAppStatus",
    async (
        {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            email,
            bvn,
            phoneNumber,
            password,
        }: {
            firstName: string;
            lastName: string;
            dateOfBirth: string;
            gender: string;
            email: string;
            bvn: string;
            phoneNumber: string;
            password: string;
        },
        thunkApi
    ) => {
        try {
            // response from creating user on main application
            console.log({
                firstName,
                lastName,
                dateOfBirth,
                gender,
                email,
                bvn,
                phoneNumber,
                password,
            });
            const createUserOnAppResponse = await authRequest.registerUserApp({
                firstName,
                lastName,
                dateOfBirth,
                gender,
                email,
                bvn,
                phoneNumber,
            });

            console.log(createUserOnAppResponse);

            if (createUserOnAppResponse.status === 200) {
                // get admin token response from keycloak
                const adminTokenResponse = await authRequest.getAdminToken();
                console.log(adminTokenResponse);

                // check if admin token response was successful or not
                if (
                    adminTokenResponse.status &&
                    adminTokenResponse.status === 200
                ) {
                    console.log(adminTokenResponse);

                    // use the access token of the admin token and user inputed fields to register user on keycloak
                    const registerUserResponse =
                        await authRequest.registerUserKeycloak({
                            firstName,
                            lastName,
                            email,
                            password,
                            customerNo: createUserOnAppResponse.data.customerNo,
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
                                return thunkApi.rejectWithValue(
                                    "A network error occur. Please check your connection"
                                );
                            case 409:
                                return thunkApi.rejectWithValue(
                                    "User already exists. Please try again with another email"
                                );

                            default:
                                return thunkApi.rejectWithValue(
                                    "Something went wrong when trying to create your account. Please try again later "
                                );
                        }
                    }
                } else {
                    switch (adminTokenResponse.response.status) {
                        case 0:
                            return thunkApi.rejectWithValue(
                                "A network error occured. Please check your connection"
                            );
                        case 401:
                            return thunkApi.rejectWithValue(
                                "We are currently working on our servers please check back later."
                            );
                        case 400:
                            return thunkApi.rejectWithValue(
                                "Something went wrong while creating your account. Please try again later"
                            );
                        case 500:
                            return thunkApi.rejectWithValue(
                                "We are current experiencing something wrong with our servers. Please try again later"
                            );
                        default:
                            return thunkApi.rejectWithValue(
                                "An error occured. Please try again later"
                            );
                    }
                }
            } else if (createUserOnAppResponse.code === "ECONNABORTED") {
                return thunkApi.rejectWithValue("Network timeout");
            } else {
                console.log("hello");
                switch (createUserOnAppResponse.status) {
                    case 400:
                        return thunkApi.rejectWithValue(
                            "Something went wrong while creating your account. Please try again later"
                        );
                    default:
                        return thunkApi.rejectWithValue(
                            "Something went wrong when trying to create your account. Please try again later "
                        );
                }
            }
        } catch (e: any) {
            console.log(e);
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const getUserFull = createAsyncThunk(
    "auth/getUserFullStatus",
    async (_, thunkAPI) => {
        try {
            const { customerNo } = ((await thunkAPI.getState()) as RootState)
                .auth.user!;
            console.log(customerNo);
            if (customerNo === "" || customerNo === null) {
                return thunkAPI.rejectWithValue(
                    "Problems getting your information, please login again"
                );
            }
            const userInfoFullAppResponse = await authRequest.getUserApp({
                customerNo,
            });

            if (userInfoFullAppResponse.code === "ECONNABORTED") {
                return thunkAPI.rejectWithValue("Network timeout");
            }

            switch (userInfoFullAppResponse.status) {
                case 200:
                    let userInfo: UserInfoAppResponse =
                        userInfoFullAppResponse.data as UserInfoAppResponse;
                    return {
                        allUserInformation: userInfo,
                    };
                default:
                    return thunkAPI.rejectWithValue(
                        "Something went wrong while getting your data. Please try again later."
                    );
            }
        } catch {}
    }
);

export const updateUserPersonalDetailsFull = createAsyncThunk(
    "auth/updateUserPersonDetailsFullStatus",
    async (
        {
            firstName,
            middleName,
            lastName,
            bvn,
            gender,
            maritalStatus,
            dateOfBirth,
            email,
            title,
            phoneNumber,
            residentialAddress,
            cscsNumber,
            identificationDocType,
            identificationDocRef,
            identificationIssueDate,
            identificationDocExpiryDate,
            identificationDocumentImage,
            proofOfAddressImage,
            picture,
        }: {
            firstName: string;
            middleName: string;
            lastName: string;
            bvn: string;
            gender: string;
            maritalStatus: string;
            dateOfBirth: string;
            title: string;
            email: string;
            phoneNumber: string;
            residentialAddress: string;
            cscsNumber: string;
            identificationDocType?: string | null;
            identificationDocRef?: string | null;
            identificationIssueDate?: string | null;
            identificationDocExpiryDate?: string | null;
            identificationDocumentImage?: string | null;
            proofOfAddressImage?: string | null;
            picture?: string | null;
        },
        thunkApi
    ) => {
        try {
            const customerNo = (thunkApi.getState() as RootState).auth.user
                ?.customerNo!;
            const updateUserPersonalDetailsResponse =
                await authRequest.updateUserPersonalInfoApp({
                    firstName,
                    bvn,
                    dateOfBirth,
                    email,
                    gender,
                    lastName,
                    maritalStatus,
                    middleName,
                    phoneNumber,
                    title,
                    customerNo: customerNo,
                    residentialAddress,
                    cscsNumber,
                    identificationDocType,
                    identificationDocRef,
                    identificationIssueDate,
                    identificationDocExpiryDate,
                    identificationDocumentImage,
                    proofOfAddressImage,
                    picture,
                });

            if (updateUserPersonalDetailsResponse.status === 200) {
                return thunkApi.dispatch<unknown, any>(getUserFull());
            } else if (
                updateUserPersonalDetailsResponse.code === "ECONNABORTED"
            ) {
                return thunkApi.rejectWithValue(
                    "Network timeout. Please check your internet connection."
                );
            } else {
                switch (updateUserPersonalDetailsResponse.status) {
                    case 0:
                        return thunkApi.rejectWithValue(
                            "A network error occured. Please check your connection"
                        );
                    default:
                        return thunkApi.rejectWithValue(
                            "Could not update your information please try again later"
                        );
                }
            }
        } catch (error) {
            return thunkApi.rejectWithValue(
                "Could not update your information please try again later"
            );
        }
    }
);

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
                    const userInfoFullAppResponse =
                        await authRequest.getUserApp({
                            customerNo: userResponse.data["customerNo"],
                        });

                    switch (userInfoFullAppResponse.status) {
                        case 200:
                            let userInfo: UserInfoAppResponse =
                                userInfoFullAppResponse.data as UserInfoAppResponse;
                            return {
                                ...userResponse.data,
                                allUserInformation: userInfo,
                                accessToken: tokenResponse.data.access_token,
                                refreshToken: tokenResponse.data.refresh_token,
                            };
                        default:
                            return thunkApi.rejectWithValue(
                                "Something went wrong while login you in"
                            );
                    }
                } else {
                    return thunkApi.rejectWithValue(
                        "Something went wrong while login you in"
                    );
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
export const createUserAuth = createAsyncThunk(
    "auth/createUserStatus",
    async (
        {
            firstName,
            lastName,
            email,

            customerNo,
            password,
        }: {
            firstName: string;
            lastName: string;
            email: string;
            customerNo: string;
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
                const registerUserResponse =
                    await authRequest.registerUserKeycloak({
                        firstName,
                        lastName,
                        email,
                        customerNo,
                        password,
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
                state.user!.name = action?.payload!.allUserInformation.name;
                state.user!.email = action?.payload!.allUserInformation.email;
                state.user!.customerNo =
                    action?.payload!.allUserInformation.customerNo;
                state.user!.dateOfBirth =
                    action?.payload!.allUserInformation.dob;
                state.user!.maritalStatus =
                    action?.payload!.allUserInformation.maritalStatus;
                state.user!.phoneNumber =
                    action?.payload!.allUserInformation.phoneRef;
                state.user!.firstName =
                    action?.payload!.allUserInformation.firstName;
                state.user!.lastName =
                    action?.payload!.allUserInformation.lastName;
                state.user!.middleName =
                    action?.payload!.allUserInformation.otherName;
                state.user!.gender = action?.payload!.allUserInformation.gender;
                state.user!.bvn = action?.payload.allUserInformation.bvn;
                return state;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                return state;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
                return state;
            })
            .addCase(createUserAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.errorMessage = "";
                return state;
            })
            .addCase(createUserAuth.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(createUserAuth.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
            })
            .addCase(createUserFull.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.errorMessage = "";
                toast.success("Account creation Successful please Login in", {id:createUserFull.name});
                return state;
            })
            .addCase(createUserFull.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = "";
                toast.loading("Creating Account...", {
                    id: createUserFull.name,
                });
            })
            .addCase(createUserFull.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
                toast.error(state.errorMessage, {id: createUserFull.name});
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
            })
            .addCase(getUserFull.fulfilled, (state, action) => {
                const allUserInformation = action.payload
                    ?.allUserInformation as UserInfoAppResponse;
                
                // personal information
                state.user!.customerNo = allUserInformation.customerNo;
                state.user!.dateOfBirth = allUserInformation.dob;
                state.user!.maritalStatus = allUserInformation.maritalStatus;
                state.user!.phoneNumber = allUserInformation.phoneRef;
                state.user!.firstName = allUserInformation.firstName;
                state.user!.lastName = allUserInformation.lastName;
                state.user!.middleName = allUserInformation.otherName;
                state.user!.gender = allUserInformation.gender;
                state.user!.bvn = allUserInformation.bvn;
                state.user!.cscsNumber = allUserInformation.memberShipNo!;
                state.user!.residentialAddress = allUserInformation.address!;
                state.user!.identificationDocType = ""
                state.user!.identificationDocRef = ""
                state.user!.identificationIssueDate = ""
                state.user!.identificationDocExpiryDate = ""
                state.user!.identificationDocumentImage = ""
                state.user!.proofOfAddressImage = ""
                state.user!.picture = ""

                // employmentInformation

            })
            .addCase(getUserFull.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(getUserFull.rejected, (state, action) => {
                console.log(action.payload);
                if (
                    action.payload ===
                    "Problems getting your information, please login again"
                ) {
                    return initialState;
                }
                state = initialState;
                state.errorMessage = action.payload as string;
            })
            .addCase(
                updateUserPersonalDetailsFull.fulfilled,
                (state, action) => {
                    state.isSuccess = true;
                    state.isLoading = false;
                    state.isError = false;
                    state.errorMessage = "";
                    toast.success("Profile was updated successfully", {
                        id: updateUserPersonalDetailsFull.name,
                        position: "top-right",
                    });
                }
            )
            .addCase(updateUserPersonalDetailsFull.pending, (state, action) => {
                state.isSuccess = false;
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
                toast.loading("Updating Profile...", {
                    id: updateUserPersonalDetailsFull.name,
                    position: "top-right",
                });
            })
            .addCase(
                updateUserPersonalDetailsFull.rejected,
                (state, action) => {
                    state.isSuccess = false;
                    state.isLoading = false;
                    state.isError = true;
                    state.errorMessage = action.payload as string;
                    toast.error(state.errorMessage, {
                        id: updateUserPersonalDetailsFull.name,
                        position: "top-right",
                    });
                }
            );
    },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
