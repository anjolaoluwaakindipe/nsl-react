import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";

function ZeroState() {
    const navigate = useNavigate();
    const navigateToLoanApplication = () => {
        navigate(paths.LOAN_APPLICATION);
    };
    return (
        <div className="bg-white relative flex flex-col-reverse md:flex-row items-center pt-10">
            <div className="p-5 md:p-10 md:min-w-[100px] md:max-w[200px] lg:min-w-[400px] md:max-w-[500px] w-full text-justify text-sm md:text-base">
                Based on your portfolio evalution, you are eligible to a maximum
                loan amount of N 500,000. The principal and interest shall be
                rolled over at maturity at the prevailing terms and conditions,
                if the principal and accrued interest are not received at
                maturity. Rolled over will not be more than once.
                <p className="pt-5">
                    Note: The loan will range from 30 days – 180 days
                </p>
                <button
                    className=" btn1 items-center md:px-15 md:py-5 mt-10"
                    onClick={navigateToLoanApplication}
                >
                    Apply for Loan
                </button>
            </div>

            <div className="w-full relative overflow-hidden h-[150px] sm:h-[300px] md:h-[400px] px-5 md:px-0">
                <img
                    src="/assets/discuss.svg"
                    alt="no_loan_svg"
                    className=" object-right  md:object-right object-cover h-full md:w-[1000px]  lg:w-[9000px] "
                />
            </div>
        </div>
    );
}

export default ZeroState;
