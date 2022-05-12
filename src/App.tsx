import React from "react";
import AppRouter from "./AppRouter";
const ModalProvider = React.lazy(()=>import("./components/shared/Modals/ModalProvider"))

function App() {
    return (
        <div className="App">
            <React.Suspense>
                <ModalProvider />
            </React.Suspense>
            <AppRouter />
        </div>
    );
}

export default App;
