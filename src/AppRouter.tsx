import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// paths
import { paths } from "./utils/constants/allPaths";
import ProtectedRoute from "./components/shared/ProtectedRoutes/ProtectedRoute";

// pages
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const LoanApplication = lazy(() => import("./pages/LoanApplication"));
const PhoneVerification = lazy(() => import("./pages/PhoneVerification"));
const Login = lazy(() => import("./pages/Login"));
const LoanPaymentOptions = lazy(() => import("./pages/LoanPaymentOptions"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const LoanInformation = lazy(() => import("./pages/LoanInformation"));
const TotalLoanInformation = lazy(() => import("./pages/TotalLoanInformation"));
const LoanContract = lazy(() => import("./pages/LoanContract"));
const TotalAdminDashboard = lazy(() => import("./pages/TotalAdminDashboard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function AppRouter() {
    return (
        <>
            <Routes>
                <Route
                    path={paths.CREATE_ACCOUNT}
                    element={<CreateAccount />}
                />
                <Route
                    path={paths.EMAIL_VERIFICATION}
                    element={<EmailVerification />}
                />

                <Route
                    path={paths.LOAN_APPLICATION}
                    element={<LoanApplication />}
                />
                <Route path={paths.LOGIN} element={<Login />} />
                <Route
                    path={paths.PHONE_VERIFICATION}
                    element={<PhoneVerification />}
                />
                <Route
                    path={paths.LOAN_PAYMENT_OPTIONS}
                    element={<LoanPaymentOptions />}
                />
                <Route
                    path={paths.LOAN_INFORMATION}
                    element={<LoanInformation />}
                />

                <Route
                    path={paths.TOTAL_LOAN_INFORMATION}
                    element={<TotalLoanInformation />}
                />

                <Route path={paths.LOAN_CONTRACT} element={<LoanContract />} />

                <Route
                    path={paths.TOTAL_ADMIN_DASHBOARD}
                    element={<TotalAdminDashboard />}
                />

                <Route
                    path={paths.USER_DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={paths.UPDATE_PROFILE.base + "/*"}
                    element={<UpdateProfile />}
                />
            </Routes>
        </>
    );
}

export default AppRouter;
