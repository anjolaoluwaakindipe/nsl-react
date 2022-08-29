import React, { useState } from "react";
import "./slider.css";
import formatMoney from "../../../utils/moneyFormatter";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/constants/allPaths";

function LoanCalculator() {
    const [loanvalue, setloanvalue] = useState<number>(50000);
    const [tenorvalue, settenorvalue] = useState<number>(90);
    const navigate = useNavigate();

    const navigateToCreateAccount = () => {
        navigate(paths.CREATE_ACCOUNT);
    };

    var interest = (loanvalue * tenorvalue * 0.05) / 100;
    return (
        <div className="relative h-[100vh] w-full  z-10 ">
            <div className="bg-contColor max-w-[90%] absolute -top-20 left-0 right-0 mx-auto ">
                <div className="p-20 ">
                    <div className="text-4xl font-light text-primaryColor pb-10 px-5 ">
                        Loan Calculator
                    </div>

                    {/* loan amount*/}

                    <div className=" flex justify-between items-end  w-full ">
                        <div className="font-bold w-20">Amount:</div>

                        <div className="  w-full  md:w-[550px] flex justify-center itens-center flex-col  rounded-md">
                            <div className="flex justify-between mb-1 ">
                                <h1 className="text-sm font-medium text-primaryColor ">
                                    50,000
                                </h1>
                                <h1 className="text-sm font-medium text-primaryColor ">
                                    10,000,000
                                </h1>
                            </div>
                            <input
                                type="range"
                                min={50000}
                                max={10000000}
                                className={` h-2.5 slider rounded-full transition-all duration-700 ease-in-out w-full mt-5`}
                                value={loanvalue}
                                onChange={(e) => {
                                    setloanvalue(parseFloat(e.target.value));
                                }}
                            />
                        </div>

                        <div className="  border-0 border-b-2  border-underlineColor w-32  flex  justify-center    ">
                            <div className="w-5">N</div>

                            <input
                                className="w-full"
                                type="number"
                                placeholder="enter amount"
                                value={loanvalue}
                                onChange={(e) => {
                                    setloanvalue(parseFloat(e.target.value));
                                }}
                                min={50000}
                                max={10000000}
                            ></input>
                        </div>
                    </div>

                    {/* tenor*/}

                    <div className=" flex justify-between items-end  w-full mt-20 ">
                        <div className="font-bold w-20">Tenor:</div>

                        <div className=" w-full  md:w-[550px] flex justify-center itens-center flex-col  rounded-md">
                            <div className="flex justify-between mb-1">
                                <h1 className="text-sm font-medium text-primaryColor ">
                                    30 days
                                </h1>
                                <h1 className="text-sm font-medium text-primaryColor ">
                                    180 days
                                </h1>
                            </div>
                            <input
                                type="range"
                                min={"30"}
                                max="180"
                                className={` h-2.5 slider rounded-full transition-all duration-700 ease-in-out w-full mt-5`}
                                value={tenorvalue}
                                step={30}
                                onChange={(e) => {
                                    settenorvalue(parseFloat(e.target.value));
                                }}
                            />
                        </div>

                        <div className="border-0 border-b-2  border-underlineColor  w-32 flex justify-start  ">
                            <input
                                className="w-8"
                                type="number"
                                placeholder="enter tenor"
                                value={tenorvalue}
                                onChange={(e) => {
                                    settenorvalue(parseFloat(e.target.value));
                                }}
                                min={"30"}
                                max="180"
                            ></input>
                            days
                        </div>
                    </div>
                </div>

                <div className="  grid grid-cols-3 px-10 gap-10  ">
                    <div className="text-primaryColor bg-gray-300 text-sm px- py-4 flex items-center justify-center rounded-lg space-x-1">
                        <span>Monthly Payment:</span>{" "}
                        <span className="font-semibold">
                            {" "}
                            N {formatMoney(interest)}
                        </span>
                    </div>
                    <div className="text-primaryColor bg-gray-300 text-sm px- py-4 flex items-center justify-center rounded-lg space-x-1">
                        <span>Total Payment:</span>
                        <span className="font-semibold">
                            {" "}
                            N {formatMoney(loanvalue + interest)}
                        </span>
                    </div>
                    <div className="text-primaryColor bg-gray-300 text-sm px- py-4 flex items-center justify-center rounded-lg space-x-1">
                        <span>Tenor:</span>{" "}
                        <span className="font-semibold">
                            {" "}
                            {tenorvalue} days
                        </span>
                    </div>
                </div>

                <div className="w-full p-10 flex items-center justify-center ">
                    <button
                        className=" btn1 items-center md:px-15 md:py-5"
                        onClick={() => navigateToCreateAccount()}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoanCalculator;

{
    /* form-range
      appearance-none
      w-full
      h-6
      p-0
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none */
}

//        {/* slider no colour */}
//        <div className="md:p-10 p-5 w-full  md:w-7/12 flex flex-col  space-y-3 bg-white rounded-md">
//        <label htmlFor="customRange1" className="form-label">Example range</label>
//        <input
//            type="range"
//            className=" bg-red-600 h-2.5 rounded-full transition-all duration-700 ease-in-out "
//            id="customRange1"
//            value={loanvalue}
//            onChange={(e) => { setloanvalue(e.target.value) }}
//            min={"50000"}
//            defaultValue={"5000000"}
//            max="10000000"
//        />
//    </div>
