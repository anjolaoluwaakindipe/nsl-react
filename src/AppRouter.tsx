import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const LoanApplication = lazy(() => import("./pages/LoanApplication"));
const PhoneVerification = lazy(() => import("./pages/PhoneVerification"));
const Login = lazy(() => import("./pages/Login"));
const LoanPaymentOptions = lazy(() => import("./pages/LoanPaymentOptions"));
const UpdateProfile = lazy(()=>import("./pages/UpdateProfile"))

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/create-account" element={<CreateAccount />} />
                <Route
                    path="/email-verification"
                    element={<EmailVerification />}
                />
                <Route path="/loan-application" element={<LoanApplication />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/phone-verification"
                    element={<PhoneVerification />}
                />
                <Route
                    path="/loan-payment-options"
                    element={<LoanPaymentOptions />}
                />
                <Route path="/update-profile/*" element={<UpdateProfile/>}/>                
            </Routes>
        </>
    );
}

export default AppRouter;
