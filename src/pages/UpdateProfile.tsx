import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";
import { PersonalDetailsForm } from "../components/pages/UpdateProfile";


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
              <Route element={<Header/>}>

                  <Route
                      path="/personal-details"
                      element={<PersonalDetailsForm />}
                  />
                  {/* j */}
              </Route>
              
            </Route>
        </Routes>
    );
}

export default UpdateProfile;
