import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// paths
import { paths } from "./utils/constants/allPaths";

// components
const ProtectedRoute = lazy(
    () => import("./components/shared/ProtectedRoutes/ProtectedRoute")
);
const NoUpdateProtectedRoute = lazy(
    () => import("./components/shared/ProtectedRoutes/NoUpdatedProtectedRoute")
);
const LoggedProtectedRoute = lazy(
    () => import("./components/shared/ProtectedRoutes/LoggedProtectedRoute")
);
const ProcessedUserPage = lazy(
    () => import("./components/shared/ProtectedRoutes/ProcessedUserPage")
);
const NewUserPage = lazy(
    () => import("./components/shared/ProtectedRoutes/NewUserPage")
);
const DraftUserPage = lazy(
    () => import("./components/shared/ProtectedRoutes/DraftUserPage")
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
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Waiting = lazy(() => import("./pages/Waiting"));
const AddCardInfo = lazy(()=> import("./pages/AddCardInfo"));
const Summary = lazy(()=> import("./pages/Summary"))

function AppRouter() {
    return (
        <>
            <React.Suspense>
                <Routes>
                    <Route
                        path={paths.CREATE_ACCOUNT}
                        element={
                            <React.Suspense>
                                <LoggedProtectedRoute>
                                    <CreateAccount />
                                </LoggedProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.EMAIL_VERIFICATION}
                        element={
                            <React.Suspense>
                                <LoggedProtectedRoute>
                                    <EmailVerification />
                                </LoggedProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route path={paths.LANDINGPAGE} element={<LandingPage />} />

                    <Route
                        path={paths.LOAN_APPLICATION}
                        element={
                            <React.Suspense>
                                <NoUpdateProtectedRoute>
                                    <ProcessedUserPage>
                                        <LoanApplication />
                                    </ProcessedUserPage>
                                </NoUpdateProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.LOGIN}
                        element={
                            <React.Suspense>
                                <LoggedProtectedRoute>
                                    <Login />
                                </LoggedProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.PHONE_VERIFICATION}
                        element={
                            <React.Suspense>
                                <LoggedProtectedRoute>
                                    <PhoneVerification />
                                </LoggedProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.LOAN_PAYMENT_OPTIONS}
                        element={
                            <React.Suspense>
                                <NoUpdateProtectedRoute>
                                    <ProcessedUserPage>
                                        <LoanPaymentOptions />
                                    </ProcessedUserPage>
                                </NoUpdateProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.LOAN_INFORMATION + "/:applicationreference"}
                        element={
                            <React.Suspense>
                                <NoUpdateProtectedRoute>
                                    <ProcessedUserPage>
                                        <LoanInformation />
                                    </ProcessedUserPage>
                                </NoUpdateProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.TOTAL_LOAN_INFORMATION}
                        element={
                            <React.Suspense>
                                <NoUpdateProtectedRoute>
                                    <ProcessedUserPage>
                                        <TotalLoanInformation />
                                    </ProcessedUserPage>
                                </NoUpdateProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.LOAN_CONTRACT+ "/:applicationreference"}
                        element={
                            <React.Suspense>
                                <NoUpdateProtectedRoute>
                                    <ProcessedUserPage>
                                        <LoanContract />
                                    </ProcessedUserPage>
                                </NoUpdateProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    {/* <Route
                        path={paths.TOTAL_ADMIN_DASHBOARD}
                        element={
                            <React.Suspense>
                                <TotalAdminDashboard />
                            </React.Suspense>
                        }
                    /> */}

                    <Route
                        path={paths.USER_DASHBOARD}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <ProcessedUserPage>
                                        <Dashboard />
                                    </ProcessedUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.UPDATE_PROFILE.base + "/*"}
                        element={
                            <ProtectedRoute>
                                <DraftUserPage>
                                    <UpdateProfile />
                                </DraftUserPage>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={paths.TERM_LOAN}
                        element={
                            <React.Suspense>
                                <NoUpdateProtectedRoute>
                                    <ProcessedUserPage>
                                        <TermLoan />
                                    </ProcessedUserPage>
                                </NoUpdateProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.PROFILE}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <ProcessedUserPage>
                                        <Profile />
                                    </ProcessedUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.ADD_CARD_INFO}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <ProcessedUserPage>
                                        <AddCardInfo />
                                    </ProcessedUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.SUMMARY}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <DraftUserPage>
                                        <Summary />
                                    </DraftUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.EDIT_UPLOADS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <DraftUserPage>
                                        <EditUploads />
                                    </DraftUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.EDIT_PERSONAL_DETAILS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <DraftUserPage>
                                        <EditPersonalDetails />
                                    </DraftUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.EDIT_EMPLOYMENT_DETAILS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <DraftUserPage>
                                        <EditEmploymentDetails />
                                    </DraftUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.EDIT_ACCOUNT_DETAILS}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <DraftUserPage>
                                        <EditAccountDetails />
                                    </DraftUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.FORGOT_PASSWORD}
                        element={
                            <React.Suspense>
                                <LoggedProtectedRoute>
                                    <ForgotPassword />
                                </LoggedProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.WELCOME}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <DraftUserPage>
                                        <Welcome />
                                    </DraftUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />

                    <Route
                        path={paths.WAITING}
                        element={
                            <React.Suspense>
                                <ProtectedRoute>
                                    <NewUserPage>
                                        <Waiting />
                                    </NewUserPage>
                                </ProtectedRoute>
                            </React.Suspense>
                        }
                    />
                </Routes>
            </React.Suspense>
        </>
    );
}

export default AppRouter;
