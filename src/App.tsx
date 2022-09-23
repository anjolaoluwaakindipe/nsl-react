import React from "react";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "./state/redux/authSlice";
import { useEffect } from "react";
import { AppDispatch } from "./state/redux/store";
import { clearLoanState } from "./state/redux/loanSlice";
import { clearCardState } from "./state/redux/cardSlice";
const ModalProvider = React.lazy(
    () => import("./components/shared/Modals/ModalProvider")
);

function App() {
    const { accessToken } = useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!accessToken) {
            dispatch(clearLoanState());
            dispatch(clearCardState());
        }
    }, [accessToken]);// eslint-disable-line
    return (
        <div className="App font-sans">
            <React.Suspense>
                <ModalProvider />
            </React.Suspense>
            <Toaster />
            <AppRouter />
        </div>
    );
}

export default App;
