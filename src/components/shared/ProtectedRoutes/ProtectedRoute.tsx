import { useKeycloak } from "@react-keycloak/web";
import React from "react";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
    const { initialized, keycloak } = useKeycloak();

    // if (!keycloak.authenticated && !initialized) {
    //     return <div></div>;
    // }

    if (!keycloak.authenticated && initialized) {
    }
    return <>{initialized && keycloak.authenticated ? children : null}</>;
}

export default ProtectedRoute;
