import React, { useState } from "react";
import "./slider.css";
import formatMoney from "../../../utils/moneyFormatter";

function LoanCalculator() {





    const [loanvalue, setloanvalue] = useState<number>(50000)
    const [tenorvalue, settenorvalue] = useState<number>(90)


    var amount = (loanvalue * tenorvalue * 0.15) / 100;
    return (
        <div className="relative h-[600px] w-full  z-10 ">
            <div className="bg-contColor w-3/4 absolute -top-20 left-0 right-0 mx-auto ">

                <div className="px-5 py-10">
                    <div className="text-2xl text-primaryColor pb-10">
                        Loan Calculator
                    </div>






                    {/* loan amount*/}

                    <div className=" grid grid-cols-10 w-full md:gap-x-5 justify-center">
                        <div className="md:col-span-2">
                            Amount:
                        </div>

                        <div className="md:p-10 p-5 w-full  md:w-7/12 flex flex-col  space-y-3 rounded-md md:col-span-6">
                            <div className="flex justify-between mb-1">
                                <h1 className="text-base font-medium text-primaryColor dark:text-white">
                                    50,000
                                </h1>
                                <h1 className="text-sm font-medium text-primaryColor dark:text-white">
                                    10,000,000
                                </h1>
                            </div>
                            <input
                                type="range"
                                min={50000}
                                max={10000000}
                                className={` h-2.5 slider rounded-full transition-all duration-700 ease-in-out w-full col-span-2`}
                                value={loanvalue}
                                onChange={(e) => { setloanvalue(parseFloat(e.target.value)) }}
                            />
                        </div>


                        <div className="md:col-span-2">
                            N
                            <input
                                className="border-0 border-b-4 border-underlineColor w-28"
                                type="number"
                                placeholder="enter amount"
                                value={loanvalue}
                                onChange={(e) => { setloanvalue(parseFloat(e.target.value)) }}
                                min={50000}
                                max={10000000}


                            >
                            </input>

                        </div>


                    </div>

                    {/* tenor*/}

                    <div className=" grid grid-cols-10 w-full md:gap-x-5 justify-center">
                        <div className="md:col-span-2">
                            Tenor:
                        </div>

                        <div className="md:p-10 p-5 w-full  md:w-7/12 flex flex-col  space-y-3 rounded-md md:col-span-6">
                            <div className="flex justify-between mb-1">
                                <h1 className="text-base font-medium text-primaryColor dark:text-white">
                                    30days
                                </h1>
                                <h1 className="text-sm font-medium text-primaryColor dark:text-white">
                                    180days
                                </h1>
                            </div>
                            <input
                                type="range"
                                min={"30"}
                                max="180"
                                defaultValue={"90"}
                                className={` h-2.5 slider rounded-full transition-all duration-700 ease-in-out w-full col-span-2`}
                                value={tenorvalue}
                                onChange={(e) => { settenorvalue(parseFloat(e.target.value)) }}
                            />
                        </div>


                        <div className="md:col-span-2">
                            <input
                                className="border-0 border-b-4 border-underlineColor w-28"
                                type="number"
                                placeholder="enter tenor"
                                value={tenorvalue}
                                onChange={(e) => { settenorvalue(parseFloat(e.target.value)) }}
                                min={"30"}
                                max="180"

                            >
                            </input>
                            days

                        </div>
                    </div>
                </div>


                <div className="  grid grid-cols-3 px-10 gap-10  ">
                    <div className="text-primaryColor bg-gray-500 p-3 flex items-center justify-center">Monthly Payment: <span> N {formatMoney(amount)}</span></div>
                    <div className="text-primaryColor bg-gray-500 flex justify-center p-2 border-2">Total Paymnet: {" "} <span> N {formatMoney(loanvalue)}</span></div>
                    <div className="text-primaryColor bg-gray-500 flex justify-center p-2 border-2">Tenor: <span> {tenorvalue} days</span></div>
                </div>


                <div className="md:px-80 md:p-10">
                    <button className=" btn1 items-center md:px-20 md:py-5">
                        Get Started
                    </button>
                </div>

            </div>
        </div>
    );
}



export default LoanCalculator;







{/* form-range
      appearance-none
      w-full
      h-6
      p-0
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none */}


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