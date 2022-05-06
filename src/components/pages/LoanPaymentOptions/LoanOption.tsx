import React from "react";

interface LoanOptionProps {
    value: string;
    label: string;
    onClick: (value: string) => void;
    isSelected: boolean;
    children?:JSX.Element
}

function LoanOption({ value, label, onClick, isSelected, children }: LoanOptionProps) {
    return (
        <div className="">
            <div
                className="w-full p-10 bg-bgColor flex items-center space-x-3 cursor-pointer"
                onClick={() => {
                    onClick(value);
                }}
            >
                {/* <input
                    className="hidden"
                    type="radio"
                    name="loanOption"
                    id={"LoanOption__" + value}
                    value={value}
                /> */}
                <div className="w-4 h-4 border-2 border-primaryColor inline-flex rounded-sm  justify-center items-center ">
                    {isSelected && (
                        <div className="w-2 h-2 bg-primaryColor"></div>
                    )}
                </div>
                <h5
                className="cursor-pointer"
                >
                    {label}
                </h5>
            </div>

            {isSelected && children}
        </div>
    );
}

export default LoanOption;
