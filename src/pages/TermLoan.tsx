import React from "react";
import NavBarLayout from "../components/layout/NavBarLayout";
import { Description } from "../components/pages/TermLoan";
import ActiveLoanDetails from "../components/pages/TermLoan/ActiveLoanDetails";

function TermLoan() {
    return (
        <NavBarLayout>
            <div className="w-full bg-bgColor2 min-h-screen relative pb-32">
                <div className="md:max-w-5xl md:mx-auto w-full px-5">
                    <h1 className="heading1 pt-10">Term Loan</h1>
                    <Description />

                    <ActiveLoanDetails />

                    
                </div>
            </div>
        </NavBarLayout>
    );
}

export default TermLoan;