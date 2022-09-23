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
                "/sentryapi/auth/realms/" +
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
                res.data = {
                    customerNo: response.data.customerNo,
                    rfid: response.data.rfid,
                    keycloakId: response.data.sub,
                };
                return res;
            })
            .catch((error) => {
                console.log(error);
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
        let res: {
            status: number;
            data:
                | {
                      access_token: string;
                      expires_in: number;
                      refresh_expires_in: number;
                      token_type: number;
                      "not-before-policy": number;
                      scope: string;
                  }
                | Record<string, any>;
        } = {
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

                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                return res;
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
            data:
                | {
                      requestId: string;
                      signUpOK: boolean;
                      statusCode: string;
                      statusMessage: string;
                  }
                | Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };
        const body = {
            firstName: firstName,
            lastName: lastName,
            bvn: bvn,
            dateOfBirth: dateOfBirth,
            gender: gender,
            email: email,
            mobilePhoneNo: phoneNumber,
        };
        return await axios
            .post(
                "/isslapi/ibank/api/v1/newcustomer",
                // /isslapi
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-TENANTID": "islandbankpoc",
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
        rfid,
        adminToken,
    }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        rfid: string;
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
                rfid: rfid,
            },
        };

        // ok response data format
        let res: { status: number; data: any; code: string } = {
            status: 0,
            data: {},
            code: "",
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
                res.status = err.response.status;
                res.code = err.response.code;
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
        rfid,
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
        inputStatus,
    }: {
        rfid?: string;
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
        inputStatus?: "New" | "Processed" | "Draft" | null;
    }) => {
        // required information to get

        const body: Record<string, any> = {};
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
        // if (email) {
        //     body.email = email;
        // }
        // if (phoneNumber) {
        //     body.mobileNo = phoneNumber;
        // }
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

        if (inputStatus) {
            body.inputStatus = inputStatus;
        }

        // response data format
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        // request to api
        return await axios
            .patch("/isslapi/onboarding-api/1.0/newcustomer/" + rfid, body, {
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

                res.status = err.response.status;
                res.code = err.code;
                return res;
            });
    },

    //update user personal details on main app
    updateUserEmploymentInfoApp: async ({
        rfid,
        jobTitle,
        natureOfBusiness,
        companyName,
        companyPhoneNumber,
        companyEmail,
        grossIncome,
        companyAddress,
        inputStatus,
    }: {
        rfid: string;
        jobTitle: string;
        natureOfBusiness: string;
        companyName: string;
        companyPhoneNumber: string;
        companyEmail: string;
        grossIncome: string;
        companyAddress: string;
        inputStatus?: "New" | "Processed" | "Draft" | null;
    }) => {
        // required information to get
        const body: Record<string, string> = {
            jobtitle: jobTitle,
            natureofbusiness: natureOfBusiness,
            employername: companyName,
            employerphone: companyPhoneNumber,
            employeremail: companyEmail,
            employeraddress: companyAddress,
            grossIncome: grossIncome,
        };

        if (inputStatus) {
            body.inputStatus = inputStatus;
        }

        // response data format
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        // request to api
        return await axios
            .patch("/isslapi/onboarding-api/1.0/newcustomer/" + rfid, body, {
                headers: {
                    "content-type": "application/json",
                    "X-TENANTID": "islandbankpoc",
                },
                timeout: 20000000,
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
                res.code = err.code;
                return res;
            });
    },

    //get user details
    getUserApp: async ({
        //information to get users
        rfid,
    }: {
        rfid: string;
    }) => {
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };
        return await axios
            .get(
                "/isslapi/ibank/api/v1/getpendingcustomerdetails",
                // /isslapi
                {
                    params: {
                        rqid: rfid,
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
    updateUserRfidKeycloak: async ({
        rfid,
        customerNo,
        adminToken,
        keycloakId,
    }: {
        rfid: string;
        customerNo: string;
        adminToken: string;
        keycloakId: string;
    }) => {
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        const body = {
            attributes: {
                rfid,
                customerNo,
            },
        };

        return await axios
            .put(
                "/sentryapi/auth/admin/realms/" +
                    CUSTOM_REALM +
                    "/users/" +
                    keycloakId,
                body,
                { headers: { Authorization: "Bearer " + adminToken } }
            )
            .then((response) => {
                res.status = response.status;
                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.code;
            });
    },
    checkAccountStatus: async ({ rfid }: { rfid: string }) => {
        const res: {
            status: null | number;
            data:
                | {
                      rqChannel: string;
                      rqDate: string;
                      //   rqFldsJson: string;
                      rqId: number;
                      rqNotes: string;
                      rqStatus: string;
                      rqStatusBy: string;
                      rqStatusById: string;
                      rqStatusDate: string;
                      rqStatusInfo: string;
                      rqType: string;
                  }
                | Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        return await axios
            .get("/isslapi/ibank/api/v1/pendingservicerequest/" + rfid, {
                headers: {
                    "Content-Type": "application/json",
                    "X-TENANTID": "islandbankpoc",
                },
            })
            .then((response) => {
                res.status = response.status;
                res.data = { ...response.data };
                console.log(res);
                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.code;
                return res;
            });
    },

    async changeStatusFromDraftToNewUser(rfid: string) {
        const res: {
            status: null | number;
            data: {} | Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };
        const body = { inputStatus: "New" };

        return await axios
            .patch("/isslapi/onboarding-api/1.0/newcustomer/" + rfid, body, {
                headers: {
                    "content-type": "application/json",
                    "X-TENANTID": "islandbankpoc",
                },
                timeout: 20000000,
            })

            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                console.log(res);
                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.response.code;
                return res;
            });
    },
    async changeStatusFromNewToDraftUser(rfid: string) {
        const res: {
            status: null | number;
            data: {} | Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };
        const body = { inputStatus: "Draft" };

        return await axios
            .patch("/isslapi/onboarding-api/1.0/newcustomer/" + rfid, body, {
                headers: {
                    "content-type": "application/json",
                    "X-TENANTID": "islandbankpoc",
                },
                timeout: 20000000,
            })

            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                console.log(res);
                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.response.code;
                return res;
            });
    },

    async doesUserExist(adminToken: string, email:string){
        const res: {status: number, code: string, data: boolean | null} = { status:0, code: "", data: null };

        return axios.get(
            "/sentryapi/auth/admin/realms/" +
                CUSTOM_REALM +
                "/users"
            ,{
                params: {
                    email: email
                },
                headers: {
                    "Authorization" : `Bearer ${adminToken}`,
                }
            }
        ).then(response=>{
            res.status = response.status;
            if(response.data.length > 0){
                res.data = true;
            }else{
                res.data = false;
            }
            return res;
        }).catch(err=>{
            res.status = err.response.status;
            res.code = err.code;
            return res;
        });
    }
};

export default authRequest;

// async function myFunc() {
//     console.log(await authRequest.changeStatusFromDraftToNewUser("9"));
// }

// myFunc();
