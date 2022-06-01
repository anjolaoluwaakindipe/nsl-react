import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// icons
import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// components
import {
    LoanOption,
    TransferForm,
} from "../components/pages/LoanPaymentOptions";
import BankCardForm from "../components/pages/LoanPaymentOptions/BankCardForm";

function LoanPaymentOptions() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (value: string) => {
        if (value === selectedOption) {
            setSelectedOption("");
            return;
        }
        setSelectedOption(value);
    };
    const navigate = useNavigate();

    return (
        <DefaultLayout>
            <>
                <div className="w-full flex justify-between ">
                    <FaAngleLeft className="text-2xl cursor-pointer" 
                    onClick={()=>{navigate(-1)}}/>
                    <IoMdClose className="text-2xl cursor-pointer" 
                    onClick={()=>{navigate(-1)}}/>
                </div>

                <div className="pt-10">
                    <h1 className="heading1">Loan Payment Options</h1>
                </div>

                <div className="pt-10 space-y-4">
                    <LoanOption
                        value="transfer"
                        onClick={handleChange}
                        label=" Transfer"
                        isSelected={
                            selectedOption === "transfer" ? true : false
                        }
                    >
                        <TransferForm />
                    </LoanOption>
                    <LoanOption
                        value="bankCard"
                        onClick={handleChange}
                        label="Bank Card"
                        isSelected={
                            selectedOption === "bankCard" ? true : false
                        }
                    >
                        <BankCardForm />
                    </LoanOption>
                </div>
            </>
        </DefaultLayout>
    );
}

export default LoanPaymentOptions;
