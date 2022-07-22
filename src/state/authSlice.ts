import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authRequest from "../services/requests/authRequest";
import {
    AuthState,
    ProofOfIdentificationFromGetUserAppResponse,
    UserInfoAppResponse,
} from "../typings";

import toast from "react-hot-toast";
import { RootState } from "./store";
import { nslRequests } from "../services/requests/nslrequests";
import { object } from "joi";

const initialState: AuthState = {
    accessToken: "",
    refreshToken: "",
    user: {
        title: "",
        rfid: "",
        rfStatus: null,
        keycloakId: "",
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
            jobTitle: "",
            natureOfBusiness: "",
            companyName: "",
            companyPhoneNumber: "",
            companyEmail: "",
            companyAddress: "",
            grossIncome: "",
        },
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

            if (
                createUserOnAppResponse.status === 200 &&
                createUserOnAppResponse.data.signUpOK === true
            ) {
                const changeToDraftedUserResponse =
                    await authRequest.changeStatusFromNewToDraftUser(
                        createUserOnAppResponse.data.requestId
                    );

                if (changeToDraftedUserResponse.status !== 200)
                    return thunkApi.rejectWithValue(
                        "Something went wrong while creating your account. Please try again later."
                    );

                // get admin token response from keycloak
                const adminTokenResponse = await authRequest.getAdminToken();

                // check if admin token response was successful or not
                if (
                    adminTokenResponse.status &&
                    adminTokenResponse.status === 200
                ) {
                    // use the access token of the admin token and user inputed fields to register user on keycloak
                    const registerUserResponse =
                        await authRequest.registerUserKeycloak({
                            firstName,
                            lastName,
                            email,
                            password,
                            rfid: createUserOnAppResponse.data.requestId,
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
            const { rfid } = ((await thunkAPI.getState()) as RootState).auth
                .user!;
            console.log(rfid);
            if (rfid === "" || rfid === null) {
                return thunkAPI.rejectWithValue(
                    "Problems getting your information, please login again"
                );
            }
            const userInfoFullAppResponse = await authRequest.getUserApp({
                rfid,
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
    "auth/updateUserPersonalDetailsFullStatus",
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
            inputStatus,
            picture,
            cb,
        }: {
            firstName?: string | null;
            middleName?: string | null;
            lastName?: string | null;
            bvn?: string | null;
            gender?: string | null;
            maritalStatus?: string | null;
            dateOfBirth?: string | null;
            title?: string | null;
            email?: string | null;
            phoneNumber?: string | null;
            residentialAddress?: string | null;
            cscsNumber?: string | null;
            identificationDocType?: string | null;
            identificationDocRef?: string | null;
            identificationIssueDate?: string | null;
            identificationDocExpiryDate?: string | null;
            identificationDocumentImage?: string | null;
            proofOfAddressImage?: string | null;
            inputStatus?: "New" | "Draft" | "Processed" | null;
            picture?: string | null;
            cb?: (...event: any[]) => void;
        },
        thunkApi
    ) => {
        try {
            const rfid = (thunkApi.getState() as RootState).auth.user?.rfid!;
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
                    inputStatus,
                    title,
                    rfid: rfid,
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
                thunkApi.dispatch<unknown, any>(getUserFull());
                return { cb };
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

export const updateUserEmploymentDetailsFull = createAsyncThunk(
    "auth/updateUserEmploymentDetailsFullStatus",
    async (
        {
            jobTitle,
            natureOfBusiness,
            companyName,
            companyPhoneNumber,
            companyEmail,
            companyAddress,
            grossIncome,
            inputStatus,
            cb,
            userInfo,
        }: {
            jobTitle: string;
            natureOfBusiness: string;
            companyName: string;
            companyPhoneNumber: string;
            companyEmail: string;
            companyAddress: string;
            grossIncome: string;
            inputStatus?: "Processed" | "New" | "Draft" | null;
            userInfo?: {
                firstName?: string | null;
                middleName?: string | null;
                lastName?: string | null;
                bvn?: string | null;
                gender?: string | null;
                maritalStatus?: string | null;
                dateOfBirth?: string | null;
                title?: string | null;
                email?: string | null;
                phoneNumber?: string | null;
                residentialAddress?: string | null;
                cscsNumber?: string | null;
                identificationDocType?: string | null;
                identificationDocRef?: string | null;
                identificationIssueDate?: string | null;
                identificationDocExpiryDate?: string | null;
                identificationDocumentImage?: string | null;
                proofOfAddressImage?: string | null;
                picture?: string | null;
                inputStatus?: "New" | "Draft" | "Processed" | null;
                cb?: (...event: any[]) => void;
            };
            cb?: (...event: any[]) => void;
        },
        thunkApi
    ) => {
        try {
            const rfid = (thunkApi.getState() as RootState).auth.user?.rfid!;
            const updateUserEmploymentDetailsResponse =
                await authRequest.updateUserEmploymentInfoApp({
                    companyAddress,
                    companyEmail,
                    companyName,
                    companyPhoneNumber,
                    grossIncome,
                    jobTitle,
                    natureOfBusiness,
                    inputStatus,
                    rfid,
                });

            let updateUserPersonalDetailsResponse: {
                status: null | number;
                data: Record<string, any>;
                code: string;
            } | null = null;

            if (userInfo) {
                updateUserPersonalDetailsResponse =
                    await authRequest.updateUserPersonalInfoApp({
                        firstName: userInfo?.firstName,
                        bvn: userInfo?.bvn,
                        dateOfBirth: userInfo?.dateOfBirth,
                        email: userInfo?.email,
                        gender: userInfo?.gender,
                        lastName: userInfo?.lastName,
                        maritalStatus: userInfo?.maritalStatus,
                        middleName: userInfo?.middleName,
                        phoneNumber: userInfo?.phoneNumber,
                        title: userInfo?.title,
                        rfid: rfid,
                        residentialAddress: userInfo?.residentialAddress,
                        cscsNumber: userInfo?.cscsNumber,
                        identificationDocType: userInfo?.identificationDocType,
                        identificationDocRef: userInfo?.identificationDocRef,
                        identificationIssueDate:
                            userInfo?.identificationIssueDate,
                        identificationDocExpiryDate:
                            userInfo?.identificationDocExpiryDate,
                        identificationDocumentImage:
                            userInfo?.identificationDocumentImage,
                        proofOfAddressImage: userInfo?.proofOfAddressImage,
                        inputStatus: "Draft",
                        picture: userInfo?.picture,
                    });
            }

            if (
                updateUserEmploymentDetailsResponse.status === 200 &&
                (updateUserPersonalDetailsResponse !== null
                    ? updateUserPersonalDetailsResponse?.status === 200
                    : true)
            ) {
                thunkApi.dispatch<unknown, any>(getUserFull());
                return { cb };
            } else if (
                updateUserEmploymentDetailsResponse.code === "ECONNABORTED"
            ) {
                return thunkApi.rejectWithValue(
                    "Network timeout. Please check your internet connection."
                );
            } else {
                switch (updateUserEmploymentDetailsResponse.status) {
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

            // check if token response was successful or not
            if (tokenResponse.status === 200) {
                // use access token to get user information
                const userResponse = await authRequest.getUserKeycloak(
                    tokenResponse.data["access_token"]
                );

                // checks if user info response was successful or not
                if (userResponse.status === 200) {
                    const userInfoFullAppResponse =
                        await authRequest.getUserApp({
                            rfid: userResponse.data["rfid"],
                        });

                    switch (userInfoFullAppResponse.status) {
                        case 200:
                            let userInfo: UserInfoAppResponse =
                                userInfoFullAppResponse.data as UserInfoAppResponse;

                            const accountStatusResponse =
                                await authRequest.checkAccountStatus({
                                    rfid: userResponse.data.rfid,
                                });

                            if (accountStatusResponse.status === 200) {
                                return {
                                    rfid: userResponse.data.rfid,
                                    keycloakId: userResponse.data.keycloakId,
                                    allUserInformation: userInfo,
                                    accessToken:
                                        tokenResponse.data.access_token,
                                    refreshToken:
                                        tokenResponse.data.refresh_token,
                                    rfidStatus:
                                        accountStatusResponse.data.rqStatus,
                                };
                            } else {
                                return thunkApi.rejectWithValue(
                                    "Something went wrong while getting your account status"
                                );
                            }

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
                        rfid: customerNo,
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

export const refreshUserTokens = createAsyncThunk(
    "auth/refreshUserTokensStatus",
    async (_, thunkAPI) => {
        try {
            const { accessToken, refreshToken } = (
                (await thunkAPI.getState()) as RootState
            ).auth;

            if (!accessToken || !refreshToken)
                return thunkAPI.dispatch<unknown, any>(logoutUser());

            const accessTokenResponse = await authRequest.getUserKeycloak(
                accessToken
            );
            console.log(accessTokenResponse);

            if (accessTokenResponse.status === 200) {
                return thunkAPI.fulfillWithValue(null);
            } else if (accessTokenResponse.status === 401) {
                const refreshTokenResponse =
                    await authRequest.refreshUserTokens(refreshToken);

                if (refreshTokenResponse.status === 200) {
                    return thunkAPI.dispatch<unknown, any>(
                        setAuthStateTokens({
                            refreshToken:
                                refreshTokenResponse.data["refresh_token"],
                            token: refreshTokenResponse.data["access_token"],
                        })
                    );
                } else if (refreshTokenResponse.status === 400) {
                    toast.error("Login Session Expired. Please login again");
                    return await thunkAPI.dispatch<unknown, any>(logoutUser());
                }
            } else {
                toast.error(
                    "Something is currently wrong with our servers. Please try and login later."
                );
                await thunkAPI.dispatch<unknown, any>(logoutUser());
            }
        } catch (e: any) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const submitUserInfoToNslDb = createAsyncThunk(
    "auth/submitUserInfoToNslDb",
    async (
        {
            allUserInfo,
            cb,
        }: {
            allUserInfo: {
                customerNo: string | null;
                firstName: string | null;
                lastName: string | null;
                middleName: string | null;
                maritalStatus: string | null;
                dateOfBirth: string | null;
                gender: string | null;
                phoneNumber: string | null;
                email: string | null;
                bvn: string | null;
                residentialAddress: string | null;
                cscsNumber: string | null;
                identificationDocType?: string | null;
                identificationDocRef?: string | null;
                identificationIssueDate?: string | null;
                identificationDocExpiryDate?: string | null;
                identificationDocumentImage?: string | null;
                proofOfAddressImage?: string | null;
                picture?: string | null;
                jobTitle: string | null;
                natureOfBusiness: string | null;
                companyName: string | null;
                companyPhoneNumber: string | null;
                companyEmail: string | null;
                companyAddress: string | null;
                grossIncome: string | null;
            };
            cb?: (...event: any[]) => void;
        },
        thunkApi
    ) => {
        try {
            const isValid = Object.values(allUserInfo).every(
                (x) => x !== null && x !== ""
            );
            if (!isValid)
                return thunkApi.rejectWithValue(
                    "Please make sure all information is filled"
                );

            const submitCustomerInfoResponse =
                await nslRequests.submitCompletedCustomerAccount({
                    ...allUserInfo,
                });

            if (submitCustomerInfoResponse.status === 200) {
                if (submitCustomerInfoResponse.data.signUpOK === true) {
                    return {
                        message:
                            "Information Submission Successful. Please wait till your account is verified",
                        cb: cb,
                    };
                } else {
                    return thunkApi.rejectWithValue(
                        "Something went wrong while submitting your information. Please check your details"
                    );
                }
            } else {
                return thunkApi.rejectWithValue(
                    "Something went wrong while submitting your information. Please try again later"
                );
            }
        } catch (e: any) {
            console.log(e);
            return thunkApi.rejectWithValue(e);
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

const userInformationStateSetter = (
    state: AuthState,
    allUserInformation: UserInfoAppResponse
) => {
    // personal information
    console.log(allUserInformation);
    state.user!.email = allUserInformation.email;
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

    // upload info
    const photoObject = allUserInformation.kycdocs.filter(
        (object) => object.documentType === "Photo"
    )[0];
    const proofOfAddressObject = allUserInformation.kycdocs.filter(
        (object) => object.documentType === "ProofofAddr"
    )[0];
    const identificationObject = allUserInformation.kycdocs.filter(
        (object) =>
            object.documentType !== "Photo" &&
            object.documentType !== "ProofofAddr" &&
            object.documentType !== "BVN"
    )![0]! as ProofOfIdentificationFromGetUserAppResponse;
    state.user!.identificationDocType = identificationObject?.documentType!;
    state.user!.identificationDocRef = identificationObject?.documentReference!;
    state.user!.identificationIssueDate =
        identificationObject?.documentIssueDate!;
    state.user!.identificationDocExpiryDate =
        identificationObject?.documentExpiryDate!;
    state.user!.identificationDocumentImage =
        identificationObject?.documentImage!;
    state.user!.proofOfAddressImage! = proofOfAddressObject?.documentImage!;
    state.user!.picture = photoObject?.documentImage!;

    // employmentInformation
    state.user!.employmentInfo.companyAddress =
        allUserInformation.employerAddress;
    state.user!.employmentInfo.companyEmail = allUserInformation.officeEmail;
    state.user!.employmentInfo.companyName =
        allUserInformation.employmentStatus;
    state.user!.employmentInfo.companyPhoneNumber =
        allUserInformation.officePhoneNo;
    state.user!.employmentInfo.jobTitle = allUserInformation.occupationDesc;
    state.user!.employmentInfo.natureOfBusiness =
        allUserInformation.natureOfBuss;
    state.user!.employmentInfo.grossIncome =
        allUserInformation.grossAnnualIncome?.toString()!;

    return state;
};

// state action for refreshing user tokens

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthStateTokens(
            state: AuthState,
            action: PayloadAction<{ refreshToken: string; token: string }>
        ) {
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.token;
        },
        clearAuthState(state: AuthState) {
            return initialState;
        },
        setUserRfid(state: AuthState, action: PayloadAction<{ rfid: string }>) {
            if (state.user?.rfid) {
                state.user.rfid = action.payload.rfid;
            }
        },
        setRfStatusToNew(state: AuthState) {
            state.user!.rfStatus = "New";
        },
        setRfStatusToReview() {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.user!.rfid = action?.payload?.rfid
                    ? action?.payload.rfid
                    : "";
                state.user!.rfStatus = action?.payload.rfidStatus;
                state.user!.keycloakId = action?.payload?.keycloakId
                    ? action?.payload.keycloakId
                    : "";
                state.accessToken = action?.payload!.accessToken;
                state.refreshToken = action?.payload!.refreshToken;
                const allUserInformation = action.payload
                    ?.allUserInformation as UserInfoAppResponse;
                return userInformationStateSetter(state, allUserInformation);
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
                toast.success("Account creation Successful please Login in", {
                    id: "createUser",
                });
                return state;
            })
            .addCase(createUserFull.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = "";
                toast.loading("Creating Account...", {
                    id: "createUser",
                });
            })
            .addCase(createUserFull.rejected, (state, action) => {
                console.log(action.payload);
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload as string;
                toast.error(state.errorMessage, { id: "createUser" });
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                return initialState;
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

                return userInformationStateSetter(state, allUserInformation);
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
                    toast.success("Personal Details was updated successfully", {
                        id: "updateUserPersonalDetailsFull",
                        position: "top-right",
                    });
                    action.payload.cb!();
                }
            )
            .addCase(updateUserPersonalDetailsFull.pending, (state, action) => {
                state.isSuccess = false;
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
                toast.loading(
                    "Updating Personal Information. Please wait this might take a while...",
                    {
                        id: "updateUserPersonalDetailsFull",
                        position: "top-right",
                    }
                );
            })
            .addCase(
                updateUserPersonalDetailsFull.rejected,
                (state, action) => {
                    state.isSuccess = false;
                    state.isLoading = false;
                    state.isError = true;
                    state.errorMessage = action.payload as string;
                    toast.error(state.errorMessage, {
                        id: "updateUserPersonalDetailsFull",
                        position: "top-right",
                    });
                }
            )
            .addCase(
                updateUserEmploymentDetailsFull.fulfilled,
                (state, action) => {
                    state.isSuccess = true;
                    state.isLoading = false;
                    state.isError = false;
                    state.errorMessage = "";
                    toast.success(
                        "Employment Details was updated successfully",
                        {
                            id: "updateUserEmploymentDetailsFull",
                            position: "top-right",
                        }
                    );
                    action.payload.cb!();
                }
            )
            .addCase(
                updateUserEmploymentDetailsFull.pending,
                (state, action) => {
                    state.isSuccess = false;
                    state.isLoading = true;
                    state.isError = false;
                    state.errorMessage = "";
                    toast.loading("Updating Employment Information...", {
                        id: "updateUserEmploymentDetailsFull",
                        position: "top-right",
                    });
                }
            )
            .addCase(
                updateUserEmploymentDetailsFull.rejected,
                (state, action) => {
                    state.isSuccess = false;
                    state.isLoading = false;
                    state.isError = true;
                    state.errorMessage = action.payload as string;
                    toast.error(state.errorMessage, {
                        id: "updateUserEmploymentDetailsFull",
                        position: "top-right",
                    });
                }
            )
            .addCase(refreshUserTokens.rejected, (state, action) => {})
            .addCase(refreshUserTokens.fulfilled, (state, action) => {})
            .addCase(refreshUserTokens.pending, (state, action) => {})
            .addCase(submitUserInfoToNslDb.rejected, (state, action) => {
                toast.loading(action.payload as string, {
                    id: "submitUserInfoToNslDb",
                    position: "top-right",
                });
            })
            .addCase(submitUserInfoToNslDb.fulfilled, (state, action) => {
                toast.success(action.payload.message, {
                    id: "submitUserInfoToNslDb",
                    position: "top-right",
                });
                if (action.payload.cb) action.payload.cb();
            })
            .addCase(submitUserInfoToNslDb.pending, (state, action) => {
                toast.loading("Submitting your Information...", {
                    id: "submitUserInfoToNslDb",
                    position: "top-right",
                });
            });
    },
});

export const { setAuthStateTokens, clearAuthState, setRfStatusToNew } =
    authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
