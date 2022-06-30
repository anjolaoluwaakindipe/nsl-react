import React from "react";
import AppRouter from "./AppRouter";
import {Toaster} from "react-hot-toast"
const ModalProvider = React.lazy(
    () => import("./components/shared/Modals/ModalProvider")
);


function App() {
    return (
        <div className="App font-sans">
            <React.Suspense>
                <ModalProvider />
            </React.Suspense>
            <Toaster/>
            <AppRouter />
        </div>
    );
}

export default App;
