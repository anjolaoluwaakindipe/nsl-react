import {
    BASE_URL,
    PASSWORD_GRANT_TYPE,
    CUSTOM_CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_CREDENTIAL_GRANT_TYPE,
    ADMIN_CLIENT_ID,
    CUSTOM_REALM,
} from "./authSettings";

// function needed to convert javascript object to x-www-form-urlencoded readable form
const xformurlencoder = (bodyFields:Record<string,any>):string => {
    let encodedStr = "";

    for (let field in bodyFields) {
        if (encodedStr) {
            encodedStr += "&";
        }
        encodedStr += field + "=" + bodyFields[field];
    }

    return encodedStr;
};

const authRequest= {
    // LOGIN USER AND GET TOKENS
    loginUser: async (username:string, password:string) => {
        // information required to login in user
        let loginInfo = {
            username: username,
            password: password,
            grant_type: PASSWORD_GRANT_TYPE,
            client_id: CUSTOM_CLIENT_ID,
        };

        // convert login information to urlencoded form
        const body = xformurlencoder(loginInfo);

        let res:{status:string, data:Record<string,any>}= {status: "", data:{}};

        // post request to keycloak server
        return await fetch(
            BASE_URL +
                "/auth/realms/" +
                CUSTOM_REALM +
                "/protocol/openid-connect/token",
            {
                body: body,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
            }
        )
            .then((response) => {
                res.status = response.status.toString()
                return response.json()})
            .then((data) => {
                console.log(data)
                res.data = data
                return res;
            })

    },

    // GET USER INFORMATION
    getUser: async (token:string) => {
        // get request to keycloak server for user info
        return await fetch(
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
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data["error"]) return { error: data };
                return data;
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

        // request to keycloak server
        return await fetch(
            BASE_URL +
                "/auth/realms/" +
                CUSTOM_REALM +
                "/protocol/openid-connect/token",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body,
                method: "POST",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data["error"]) return { error: data };
                return data;
            })
            .catch((err) => {
                console.log(err.message);
                return err;
            });
    },

    // REGISTER A NEW USER
    registerUser: async ({
        firstName,
        lastName,
        email,
        username,
        password,
        adminToken,
    }:{[key:string]:string}) => {
        // information needed to register a new user on a keycloak server
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            enabled: true,
            credentials: [
                {
                    value: password,
                    type: "password",
                    temporary: false,
                },
            ],
        };

        // request to keycloak server
        return await fetch(
            BASE_URL + "/auth/admin/realms/" + CUSTOM_REALM + "/users",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + adminToken,
                },
                method: "POST",
                body: JSON.stringify(body),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data["error"]) return { error: data };
                return data;
            })
            .catch((err) => {
                console.log(err.message);
                return err;
            });
    },

    // LOGOUT A USER SESSION
    logoutUser: async ({ refreshToken }:{[key:string]:string}) => {
        // necessary setting information in order to logout
        const logoutInfo = {
            client_id: CUSTOM_CLIENT_ID,
            refresh_token: refreshToken,
        };

        const body = xformurlencoder(logoutInfo);

        // request to keycloak server
        return await fetch(
            BASE_URL +
                "/auth/realms/" +
                CUSTOM_REALM +
                "/protocol/openid-connect/logout",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body,
                method: "POST",
            }
        )
            .then((res) => res.json)
            .then(() => ({ success: true }))
            .catch((err) => {
                console.log(err.message);
                return err;
            });
    },

    // UPDATE USER PASSWORD
    updatePassword: async ({ newPassword, userId, adminToken }:{[key:string]:string}) => {
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