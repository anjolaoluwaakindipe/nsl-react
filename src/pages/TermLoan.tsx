import React from "react";
import NavBarLayout from "../components/layout/NavBarLayout";
import { Description } from "../components/pages/TermLoan";
import ActiveLoanDetails from "../components/pages/TermLoan/ActiveLoanDetails";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function TermLoan() {
    const navigate = useNavigate();
    return (
        <NavBarLayout>
            <div className="w-full bg-bgColor2 min-h-screen relative pb-32">
                <div>
                    <div className="md:max-w-5xl md:mx-auto w-full px-5 flex flex-col">
                        {/* Back Button */}
                        <IoIosArrowDropleftCircle
                            className="  text-2xl text-primaryColor cursor-pointer hover:brightness-75 self-end my-5 "
                            onClick={() => navigate(-1)}
                        />
                        <h1 className="heading1 pt-10">Term Loan</h1>
                        <Description />

                        <ActiveLoanDetails />
                    </div>
                </div>
            </div>
        </NavBarLayout>
    );
}

export default TermLoan;
