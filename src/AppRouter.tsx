import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// paths
import { paths } from "./utils/constants/allPaths";

// components
const ProtectedRoute = lazy(
    () => import("./components/shared/ProtectedRoutes/ProtectedRoute")
);

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
const TermLoan = lazy(() => import("./pages/TermLoan"));
const Profile = lazy(() => import("./pages/Profile"));
const EditUploads = lazy(() => import("./pages/EditUploads"));
const EditEmploymentDetails = lazy(
    () => import("./pages/EditEmploymentDetails")
);
const EditPersonalDetails = lazy(() => import("./pages/EditPersonalDetails"));
const EditAccountDetails = lazy(() => import("./pages/EditAccountDetails"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Welcome = lazy(() => import("./pages/Welcome"));

function AppRouter() {
    return (
        <>
            <React.Suspense>
                <Routes>
                    <Route
                        path={paths.CREATE_ACCOUNT}
                        element={
                            <React.Suspense>
                                <CreateAccount />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.EMAIL_VERIFICATION}
                        element={
                            <React.Suspense>
                                <EmailVerification />
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.LOAN_APPLICATION}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <LoanApplication />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.LOGIN}
                        element={
                            <React.Suspense>
                                <Login />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.PHONE_VERIFICATION}
                        element={
                            <React.Suspense>
                                <PhoneVerification />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.LOAN_PAYMENT_OPTIONS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <LoanPaymentOptions />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.LOAN_INFORMATION}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <LoanInformation />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.TOTAL_LOAN_INFORMATION}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <TotalLoanInformation />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.LOAN_CONTRACT}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <LoanContract />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.TOTAL_ADMIN_DASHBOARD}
                        element={
                            <React.Suspense>
                                <TotalAdminDashboard />
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.USER_DASHBOARD}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.UPDATE_PROFILE.base + "/*"}
                        element={
                            <ProtectedRoute>
                                <UpdateProfile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={paths.TERM_LOAN}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <TermLoan />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.PROFILE}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.EDIT_UPLOADS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <EditUploads />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.EDIT_PERSONAL_DETAILS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <EditPersonalDetails />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.EDIT_EMPLOYMENT_DETAILS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <EditEmploymentDetails />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.EDIT_ACCOUNT_DETAILS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <EditAccountDetails />
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.FORGOT_PASSWORD}
                        element={
                            <React.Suspense>
                                <ForgotPassword />
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.WELCOME}
                        element={
                            <React.Suspense>
                                <Welcome />
                            </React.Suspense>
                        }
                    />
                </Routes>
            </React.Suspense>
        </>
    );
}

export default AppRouter;
