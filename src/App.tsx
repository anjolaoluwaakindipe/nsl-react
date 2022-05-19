import React from "react";
import AppRouter from "./AppRouter";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./services/keycloak/keycloak";

const ModalProvider = React.lazy(
    () => import("./components/shared/Modals/ModalProvider")
);

function App() {
    return (
        <div className="App">
            <ReactKeycloakProvider
                authClient={keycloak}
                
            >
                <React.Suspense>
                    <ModalProvider />
                </React.Suspense>
                <AppRouter />
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
