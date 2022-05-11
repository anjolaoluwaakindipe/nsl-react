import React, { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";

const EmploymentDetailsForm = lazy(
    () => import("../components/pages/UpdateProfile/EmploymentDetailsForm")
);
const PersonalDetailsForm = lazy(
    () => import("../components/pages/UpdateProfile/PersonalDetailsForm")
);
const AccountDetailsForm = lazy(
    () => import("../components/pages/UpdateProfile/AccountDetailsForm")
);

function Header() {
    return (
        <div>
            <h1 className="heading1">Update Profile</h1>
            <Outlet />
        </div>
    );
}

function UpdateProfile() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route element={<Header />}>
                    <Route
                        path="/personal-details"
                        element={
                            <React.Suspense>
                                <PersonalDetailsForm />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/employment-details"
                        element={
                            <React.Suspense>
                                <EmploymentDetailsForm />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/account-details"
                        element={
                            <React.Suspense>
                                <AccountDetailsForm />
                            </React.Suspense>
                        }
                    />
                    {/* j */}
                </Route>
            </Route>
        </Routes>
    );
}

export default UpdateProfile;
