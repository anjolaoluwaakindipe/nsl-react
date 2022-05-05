import React from "react";
import { Routes, Route } from "react-router-dom";
import { CreateAccount, LoanContract, EmailVerification, PhoneVerification, Login, LoanApplication, LoanInformation, LoanPaymentOptions, TotalLoanInformation } from "./pages";

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/create-account" element={<CreateAccount />} />
                <Route
                    path="/email-verification"
                    element={<EmailVerification />}
                />
                <Route path='/loan-application' element={<LoanApplication />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/phone-verification"
                    element={<PhoneVerification />}
                />
                <Route
                    path="/loan-payment-options"
                    element={< LoanPaymentOptions />}
                />
                <Route
                    path="/loan-information"
                    element={<LoanInformation />} />

                <Route
                    path="/total-loan-information"
                    element={<TotalLoanInformation />} />

<Route
                    path="/loan-contract"
                    element={<LoanContract />} />
            </Routes>
        </>
    );
}

export default AppRouter;
