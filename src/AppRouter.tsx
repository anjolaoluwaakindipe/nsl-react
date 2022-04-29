import React from "react";
import { Routes, Route } from "react-router-dom";
import { CreateAccount, EmailVerification, PhoneVerification, Login , LoanApplication, LoanPaymentOptions} from "./pages";

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/create-account" element={<CreateAccount />} />
                <Route
                    path="/email-verification"
                    element={<EmailVerification />}
                />
                <Route path= '/loan-application' element={<LoanApplication/>}/>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/phone-verification"
                    element={<PhoneVerification />}
                />
                <Route
                    path="/loan-payment-options"
                    element={< LoanPaymentOptions/>}
                />
            </Routes>
        </>
    );
}

export default AppRouter;
