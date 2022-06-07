import React, { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";

// paths
import { paths } from "../utils/constants/allPaths";

// form components
const NavBarLayout = lazy(()=> import("../components/layout/NavBarLayout"))
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
        <React.Suspense><NavBarLayout>
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route element={<Header />}>
                    <Route
                        path={paths.UPDATE_PROFILE.PERSONAL_DETAILS}
                        element={
                            <React.Suspense>
                                <PersonalDetailsForm />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.UPDATE_PROFILE.EMPLOYMENT_DETAILS}
                        element={
                            <React.Suspense>
                                <EmploymentDetailsForm />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={paths.UPDATE_PROFILE.ACCOUNT_DETAILS}
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
        </NavBarLayout></React.Suspense>
    );
}

export default UpdateProfile;
