import React from "react";

import DefaultLayout from "../components/layout/DefaultLayout";

import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


import { Header,TopBar, LoanActivity } from "../components/pages/TotalAdminDashboard";

function TotalAdminDashboard(){

    return(
        <DefaultLayout>
            <>
            <TopBar/>
            <Header />
            <LoanActivity/>

            </>
        </DefaultLayout>
    );
}

export default TotalAdminDashboard;