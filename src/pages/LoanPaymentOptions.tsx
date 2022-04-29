import React, { Children } from "react";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// icons
import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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

                <div>
                    <LoanOption name="transfer">Transfer</LoanOption>
                    <LoanOption name="bankCard">Bank Card</LoanOption>
                </div>
            </>
        </DefaultLayout>
    );
}

interface LoanOptionProps{
    name:string
    children:string
}

function LoanOption({name, children}:LoanOptionProps){
    return (

        <div className="p-8 w-full bg-bgColor">
            <span>
                <input className="hidden" type="checkbox" name={name} id="" />
                <span></span>
            </span>
            <h4>{children}</h4>
        </div>
    )
}

export default LoanPaymentOptions;
