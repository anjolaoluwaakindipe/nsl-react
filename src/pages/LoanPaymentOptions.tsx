import React from "react";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// icons
import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LoanOption } from "../components/pages/LoanPaymentOptions";

function LoanPaymentOptions() {
    return (
        <DefaultLayout>
            <>
                <div className="w-full flex justify-between ">
                    <FaAngleLeft className="text-2xl cursor-pointer" />
                    <IoMdClose className="text-2xl cursor-pointer" />
                </div>

                <div className="pt-10">
                    <h1 className="heading1">Loan Payment Options</h1>
                </div>

                <div className="pt-10 space-y-4">
                    <LoanOption name="transfer">Transfer</LoanOption>
                    <LoanOption name="bankCard">Bank Card</LoanOption>
                </div>
            </>
        </DefaultLayout>
    );
}

export default LoanPaymentOptions;
