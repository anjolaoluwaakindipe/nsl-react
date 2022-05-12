import React from "react";

import {
    Header,
    LoanStatGroup,
    LoanActivity,
    GraphSection,
} from "../components/pages/TotalAdminDashboard";

function TotalAdminDashboard() {
    return (
        <div className="bg-bgColor2 ">
            <div className="md:max-w-6xl md:mx-auto w-full">
                <Header />
                <LoanStatGroup />
                <GraphSection/>
                <LoanActivity />
            </div>
        </div>
    );
}

export default TotalAdminDashboard;
