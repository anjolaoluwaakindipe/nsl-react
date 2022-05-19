import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://sentry.issl.ng/auth/",
    clientId: "nsl-react-client",
    realm: "nsl",
});

export default keycloak;
