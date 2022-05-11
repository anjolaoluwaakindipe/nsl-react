import React from "react";
import {Header, LoanActivity, LoanBalanceDet } from "../components/pages/UserDashboard";


function Dashboard(){
    return(
        <div className="bg-bgColor2">
            <div className="md:max-w-6x1 md:mx-auto w-full">
                <Header/>
                <LoanBalanceDet/>
                <LoanActivity/>
            </div>

        </div>
    );
}

export default Dashboard;