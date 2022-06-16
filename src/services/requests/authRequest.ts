import axios from "axios";
import { appendFile } from "fs";
import {
    ADMIN_CLIENT_ID,
    BASE_URL,
    CLIENT_CREDENTIAL_GRANT_TYPE,
    CLIENT_SECRET,
    CUSTOM_CLIENT_ID,
    CUSTOM_REALM,
    PASSWORD_GRANT_TYPE,
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
                    timeout: 10000,
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
    getUser: async (token: string) => {
        // get request to keycloak server for user info
        let res: { status: number; data: any } = {
            status: 0,
            data: {},
        };
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
                    timeout: 10000,
                    timeoutErrorMessage: "User Data Request Timeout",
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
        const res: { status: null | number, data: Record<string, any>, code: string } = { status: null, data: {}, code: "" }
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
                console.log(response);
                res.status = response.status;
                res.data = response.data;
                console.log("there was success");
                console.log(res);
                return res;
            })
            .catch((error) => {
                console.log(error.response);
                console.log("there was an error");
                res.status = error.response.status;
                res.code = error.code;
                console.log(res);
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
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err.message);
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

    // UPDATE USER PASSWORD
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

    //update user details 
    updateUserApp: async () => {
        // required information to get
        const Info = {
            CustomerNo: customerno,
            
        };

        // body
        const body = X-TENEANTID(islandbankpoc);

        // response data format
        let res: { status: number; data: any } = {
            status: 0,
            data: {},
        };

        // request to api
        return await axios
            .post(
                "/isslapi/ibank/api/v1/updateCustomerDetails2",
                body,
                {
                    headers: {
                        "content-type": "application/json",
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



//get user details
getUserApp: async ({
    //information to get users
    customerno,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    bvn,
    phoneNumber,

}: {
    customerno: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    bvn: string;
    phoneNumber: string;
}) => {
    const res: { status: null | number, data: Record<string, any>, code: string } = { status: null, data: {}, code: "" }
    return await axios
        .get(
            "/isslapi/ibank/api/v1/getCustomer",
            // /isslapi
            {
                params: {
                    customerno: customerno
                },
            }
        )
        .then((response) => {
            console.log(response);
            res.status = response.status;
            res.data = response.data;
            console.log("there was success");
            console.log(res);
            return res;
        })
        .catch((error) => {
            console.log(error.response);
            console.log("there was an error");
            res.status = error.response.status;
            res.code = error.code;
            console.log(res);
            return res;
        });
},

};
export default authRequest;

function myFunc() {
    authRequest.registerUserApp({
        email: "asdfasd@fmai.cos",
        firstName: "Anjy",
        "lastName": "Anjy",
        dateOfBirth: "2000-12-08",
        bvn: "12345678901",
        gender: "M",
        phoneNumber: "+313241234234",

    });
}

myFunc();
