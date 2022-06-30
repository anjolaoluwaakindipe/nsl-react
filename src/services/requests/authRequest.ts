import axios from "axios";
import {
    ADMIN_CLIENT_ID,
    BASE_URL,
    CLIENT_CREDENTIAL_GRANT_TYPE,
    CLIENT_SECRET,
    CUSTOM_CLIENT_ID,
    CUSTOM_REALM,
    PASSWORD_GRANT_TYPE,
    REFRESH_TOKEN_GRANT_TYPE,
} from "./authSettings";

// function needed to convert javascript object to x-www-form-urlencoded readable form
const xformurlencoder = (bodyFields: Record<string, any>): string => {
    let encodedStr = "";

    for (let field in bodyFields) {
        if (encodedStr) {
            encodedStr += "&";
        }
        encodedStr += field + "=" + bodyFields[field];
    }

    return encodedStr;
};

const authRequest = {
    // LOGIN USER AND GET TOKENS
    loginUser: async (username: string, password: string) => {
        // information required to login in user
        let loginInfo = {
            username: username,
            password: password,
            grant_type: PASSWORD_GRANT_TYPE,
            client_id: CUSTOM_CLIENT_ID,
        };

        // convert login information to urlencoded form
        const body = xformurlencoder(loginInfo);

        let res: { status: number; data: any } = {
            status: 0,
            data: {},
        };

        // post request to keycloak server
        return await axios
            .post(
                BASE_URL +
                    "/auth/realms/" +
                    CUSTOM_REALM +
                    "/protocol/openid-connect/token",
                body,

                {
                    headers: {
                        "content-type":
                            "application/x-www-form-urlencoded;charset=utf-8",
                    },
                    timeout: 1000000,
                    timeoutErrorMessage: "Login Request Timeout",
                }
            )
            .then((response) => {
                // console.log(response);
                res.status = response.status;
                res.data = response.data;

                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    // GET USER INFORMATION
    getUserKeycloak: async (token: string) => {
        // get request to keycloak server for user info
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        return await axios
            .get(
                BASE_URL +
                    "/auth/realms/" +
                    CUSTOM_REALM +
                    "/protocol/openid-connect/userinfo",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: "application/json",
                    },
                    method: "GET",
                   
                }
            )
            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                return res;
            })
            .catch((error) => {
                console.log(error)
                res.status = error.response.status;
                res.code = error.code;
                return res;
            });
    },

    // GET THE ADMIN TOKEN
    getAdminToken: async () => {
        // required information to get an admin token from keycloak server
        const adminTokenInfo = {
            client_secret: CLIENT_SECRET,
            grant_type: CLIENT_CREDENTIAL_GRANT_TYPE,
            client_id: ADMIN_CLIENT_ID,
        };

        // convert adminToken info to a urlencoded form
        const body = xformurlencoder(adminTokenInfo);

        // response data format
        let res: { status: number; data: any } = {
            status: 0,
            data: {},
        };

        // request to keycloak server
        return await axios
            .post(
                BASE_URL +
                    "/auth/realms/" +
                    CUSTOM_REALM +
                    "/protocol/openid-connect/token",
                body,
                {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },

                    method: "POST",
                }
            )

            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                console.log(res);

                return res;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    },

    registerUserApp: async ({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
        bvn,
        phoneNumber,
    }: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        gender: string;
        email: string;
        bvn: string;
        phoneNumber: string;
    }) => {
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };
        return await axios
            .get(
                "/isslapi/ibank/api/v1/createBasicAccount",
                // /isslapi
                {
                    params: {
                        FirstName: firstName,
                        LastName: lastName,
                        BVN: bvn,
                        DateofBirth: dateOfBirth,
                        Gender: gender,
                        EMailAddress: email,
                        MobilePhoneNo: phoneNumber,
                    },
                }
            )
            .then((response) => {
                res.status = response.status;
                res.data = response.data;

                return res;
            })
            .catch((error) => {
                res.status = error.response.status;
                res.code = error.code;

                return res;
            });
    },

    // REGISTER A NEW USER
    registerUserKeycloak: async ({
        firstName,
        lastName,
        email,
        password,
        customerNo,
        adminToken,
    }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        customerNo: string;
        adminToken: string;
    }) => {
        // information needed to register a new user on a keycloak server
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            emailVerified: true,
            username: email,
            enabled: true,
            credentials: [
                {
                    value: password,
                    type: "password",
                    temporary: false,
                },
            ],
            attributes: {
                customerNo: customerNo,
            },
        };

        // ok response data format
        let res: { status: number; data: any } = {
            status: 0,
            data: {},
        };

        // request to keycloak server
        return await axios
            .post(
                BASE_URL + "/auth/admin/realms/" + CUSTOM_REALM + "/users",
                body,
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: "Bearer " + adminToken,
                    },
                }
            )

            .then((response) => {
                res.status = response.status;
                res.data = response.data;

                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    // LOGOUT A USER SESSION
    logoutUser: async ({ refreshToken }: { refreshToken: string }) => {
        // necessary setting information in order to logout
        const logoutInfo = {
            client_id: CUSTOM_CLIENT_ID,
            refresh_token: refreshToken,
        };

        const body = xformurlencoder(logoutInfo);

        let res: { status: number; data: any } = {
            status: 0,
            data: {},
        };

        // request to keycloak server
        return await axios
            .post(
                BASE_URL +
                    "/auth/realms/" +
                    CUSTOM_REALM +
                    "/protocol/openid-connect/logout",
                body,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    method: "POST",
                }
            )

            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                return res;
            })
            .catch((err) => {
                console.log(err.message);
                return err;
            });
    },

    // UPDATE USER PASSWORD Not finished
    updatePassword: async ({
        newPassword,
        userId,
        adminToken,
    }: {
        [key: string]: string;
    }) => {
        // new password settings
        const body = {
            temporary: false,
            value: newPassword,
            type: "password",
        };

        // request to keycloak server
        return await fetch(
            BASE_URL +
                `/auth/admin/realms/${CUSTOM_REALM}/users/${userId}/reset-password`,
            {
                body: JSON.stringify(body),
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + adminToken,
                },
            }
        )
            .then((res) => res.json())
            .then(() => ({ success: true }))
            .catch((err) => {
                console.log(err.message);
                return err;
            });
    },

    //update user personal details on main app
    updateUserPersonalInfoApp: async ({
        customerNo,
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
        customerNo?: string;
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
    }) => {
        // required information to get

        const body: Record<string, any> = {
            customerNo: customerNo,
        };
        if (firstName) {
            body.firstname = firstName;
        }
        if (lastName) {
            body.surname = lastName;
        }
        if (middleName) {
            body.middlename = middleName;
        }
        if (bvn) {
            body.bvn = bvn;
        }
        if (gender) {
            body.gender = gender;
        }
        if (title) {
            body.title = title;
        }
        if (maritalStatus) {
            body.maritalStatus = maritalStatus;
        }
        if (dateOfBirth) {
            body.dateOfBirth = dateOfBirth;
        }
        if (email) {
            body.email = email;
        }
        if (phoneNumber) {
            body.mobileNo = phoneNumber;
        }
        if (cscsNumber) {
            body.cscsno = cscsNumber;
        }
        if (residentialAddress) {
            body.ResidentialAddress = residentialAddress;
        }
        if (
            identificationDocType &&
            identificationDocRef &&
            identificationIssueDate &&
            identificationDocExpiryDate &&
            identificationDocumentImage
        ) {
            body.idDocType = identificationDocType;
            body.idDocRef = identificationDocRef;
            body.idIssueDate = identificationIssueDate;
            body.idDocExpiryDate = identificationDocExpiryDate;
            body.idDocumentImage = identificationDocumentImage;
        }
        if (proofOfAddressImage) {
            body.proofOfAddressImage = proofOfAddressImage;
        }
        if (picture) {
            body.photo = picture;
        }

        // response data format
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        // request to api
        return await axios
            .post("/isslapi/ibank/api/v1/updateCustomerDetails2", body, {
                headers: {
                    "content-type": "application/json",
                    // "X-TENANTID": "islandbankpoc",
                },
                timeout: 2000000,
                method: "POST",
            })

            .then((response) => {
                console.log(response);
                res.status = response.status;
                res.data = response.data;
                console.log(res);

                return res;
            })
            .catch((err) => {
                console.log(err);
                if (!err.response.status && !err.response.code) {
                    return res;
                }
                res.status = err.response.status;
                res.code = err.response.code;
                return res;
            });
    },

    //update user personal details on main app
    updateUserEmploymentInfoApp: async ({
        customerNo,
        jobTitle,
        natureOfBusiness,
        companyName,
        companyPhoneNumber,
        companyEmail,
        grossIncome,
        companyAddress,
    }: {
        customerNo: string;
        jobTitle: string;
        natureOfBusiness: string;
        companyName: string;
        companyPhoneNumber: string;
        companyEmail: string;
        grossIncome: string;
        companyAddress: string;
    }) => {
        // required information to get

        const body = {
            customerNo,
            jobtitle: jobTitle,
            natureofbusiness: natureOfBusiness,
            employername: companyName,
            employerphone: companyPhoneNumber,
            employeremail: companyEmail,
            employeraddress: companyAddress,
            grossIncome: grossIncome,
        };

        // response data format
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        // request to api
        return await axios
            .post("/isslapi/ibank/api/v1/updateCustomerDetails2", body, {
                headers: {
                    "content-type": "application/json",
                    // "X-TENANTID": "islandbankpoc",
                },
                timeout: 2000000,
                method: "POST",
            })

            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                console.log(res);

                return res;
            })
            .catch((err) => {
                if (!err.response.status && !err.response.code) {
                    return res;
                }
                res.status = err.response.status;
                res.code = err.response.code;
                return res;
            });
    },

    //get user details
    getUserApp: async ({
        //information to get users
        customerNo,
    }: {
        customerNo: string;
    }) => {
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };
        return await axios
            .get(
                "/isslapi/ibank/api/v1/getCustomerDetailsv3",
                // /isslapi
                {
                    params: {
                        CustomerNo: customerNo,
                    },
                }
            )
            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                return res;
            })
            .catch((error) => {
                res.status = error.response.status;
                res.code = error.code;
                return res;
            });
    },
    refreshUserTokens: async (refreshToken: string) => {
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        // information required to login in user
        let refreshInfo = {
            refresh_token: refreshToken,
            grant_type: REFRESH_TOKEN_GRANT_TYPE,
            client_id: CUSTOM_CLIENT_ID,
        };

        // convert login information to urlencoded form
        const body = xformurlencoder(refreshInfo);

        return await axios
            .post(
                BASE_URL +
                    "/auth/realms/" +
                    CUSTOM_REALM +
                    "/protocol/openid-connect/token",
                body,
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=utf-8",
                    },
                    timeout: 100000,
                    timeoutErrorMessage: "Login Request Timeout",
                }
            )
            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                return res;
            })
            .catch((error) => {
                res.status = error.response.status;
                res.code = error.code;
                return res;
            });
    },
};

export default authRequest;

// async function myFunc() {
//     console.log(
//         await authRequest.refreshUserTokens(
//             "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2MzA5ZjU2MS0yNTk3LTQzYTgtYmU0OS04NzQ1NzNjNDllZjUifQ.eyJleHAiOjE2NTY1MTI1NzksImlhdCI6MTY1NjUxMDc3OSwianRpIjoiZDEyMWMxMjctZjI1Ni00NDY3LTk3ODktZDdlN2M5NDQ5NmI1IiwiaXNzIjoiaHR0cHM6Ly9zZW50cnkuaXNzbC5uZy9hdXRoL3JlYWxtcy9uc2wiLCJhdWQiOiJodHRwczovL3NlbnRyeS5pc3NsLm5nL2F1dGgvcmVhbG1zL25zbCIsInN1YiI6ImYyMzYxM2RlLTk3MWYtNDcxNi1hNDU0LTZmMzczNDRiOTg1YSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJuc2wtcmVhY3QtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjI4M2UwYmE4LTgyZjgtNDY3ZS1iMDNhLTNmNDAxMzZjOTk1ZSIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCJ9.3u79cTQfJtzjnqxon0SlRsG34zs7CmLhMwJ80JIYmkQ"
//         )
//     );
// }

// myFunc();
