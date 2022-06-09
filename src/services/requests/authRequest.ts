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

    // REGISTER A NEW USER
    registerUser: async ({
        fullName,
        email,
        password,
        phoneNumber,
        adminToken,
    }: {
        fullName: string;
        email: string;
        password: string;
        phoneNumber: string;
        adminToken: string;
    }) => {
        // manipulating  the full name
        const lastName =
            fullName.split(" ").length === 1
                ? ""
                : fullName.trim().split(" ").pop();
        const firstName = fullName
            .trim()
            .split(" ")
            .slice(0, fullName.trim().split(" ").length - 1)
            .join(" ");
        // information needed to register a new user on a keycloak server
        const body = {
            firstName: firstName,
            lastName: lastName || "",
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
                phoneNumber: phoneNumber,
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
};
export default authRequest;

function myFunc() {
    authRequest.registerUser({
        email: "asdfasd",
        fullName: "asdfadsfasdfdf",
        password: "asfdadfasdf",
        phoneNumber: "+313241234234",
        adminToken:
            "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJleHpaUDV5OTFTNEpobThUeUx1cGxkdlB2U3l0ckZqVFE2UF9DcGRTdlZzIn0.eyJleHAiOjE2NTQ3NjY1MDgsImlhdCI6MTY1NDc2NjIwOCwianRpIjoiY2JhYWIzNTEtYTNiNC00NDkwLWIyNDQtYzNmZjk1MjBjMDFhIiwiaXNzIjoiaHR0cHM6Ly9zZW50cnkuaXNzbC5uZy9hdXRoL3JlYWxtcy9uc2wiLCJzdWIiOiI4YmU2OTQ1NS0wYWUxLTRkYjUtYjQ0Ni1lNmYzODliMzgwYjEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJhZG1pbi1jbGkiLCJjbGllbnRIb3N0IjoiMTk3LjI0Mi4xMTQuMTM1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWFkbWluLWNsaSIsImNsaWVudEFkZHJlc3MiOiIxOTcuMjQyLjExNC4xMzUifQ.ivtpeSCaJIYnoJ0AZv8Bi3KTw5RwsWTdnDEZeSgzEeSuxGHRjlsoHwpU3-HWvdtRnuAzI3m7cFQMw9S6T8zrPvOG8IgOoRhAJyxbZnJ0EweGNXNeTTlnZU87XflBOYr1iDeb1nbvt5X1-eaAkt9spaSYRdeguqRiPNzcqWfL7f_vRB2jkKSRiLrbwZGHzPFxfMb5Ob5V5t45mNS2GPD_D5mYRG28uuEvIWkBL3KlBWYyFp7Ueyws5-rRzr0vDbckU1tLXjkuyBs-0wqy_V-0g9Vm2iLvuFLyLr2jxYN-bCZK-PD8DO31iPhirb8Ne-zFVbHc4LpF4PLmcBCee7HITw",
    });
}

myFunc();
