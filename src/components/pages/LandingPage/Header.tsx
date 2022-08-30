import { useState } from "react";
import formatMoney from "../../../utils/moneyFormatter";

function Header() {
    const [loanvalue, setloanvalue] = useState<number>(50000);
    const [tenorvalue, settenorvalue] = useState<number>(150);
    var interest = (loanvalue * tenorvalue * 0.05) / 100;
    return (
        <div className=" w-full min-h-screen bg-white">
            <div className=" py-4 bg-peach   ">
                <div className="max-w-[90%] mx-auto pt-32 flex flex-col md:flex-row justify-between">
                    {/* <img
                    src="/assets/landingguy.svg"
                    alt="logo"
                    className="object-contain xl:h-[400px] md:h-[350px] float-right absolute bottom-16 right-0 "
                /> */}
                    <div className="text-primaryColor font-bold space-y-7  z-10 px-11 py-14 relative bottom-2 left-3 min-w-[60%]  ">
                        <img
                            src="/assets/dots.svg"
                            className="absolute object-contain -top-0 left-4 z-0 w-40"
                            alt="dots"
                        />
                        <div className="z-30 relative text-center md:text-left text-5xl md:text-5xl  xl:text-6xl">
                            <span className="font-normal ">S</span>
                            ecure, <span className="font-normal">
                                F
                            </span>ast, <span className="font-normal">R</span>
                            eliable
                            <p>
                                <span className="font-normal"> and E</span>
                                ffective.
                            </p>
                        </div>

                        <div className="text-darkTextColor text-center md:text-left text-xl xl:text-2xl font-light md:max-w-md xl:max-w-xl py-10">
                            Grow and expand your business with us. A range of
                            easily accessible loans
                        </div>
                        <button className="btn1 w-full md:w-auto">
                            Request for Loan
                        </button>
                    </div>
                    {/* Loan Calculator */}
                    <div className="w-full px-5 relative h-[90vh] md:h-auto">
                        <div className="bg-white shadow-md w-full px-4 pt-10 pb-8 flex flex-col rounded-lg absolute top-5 ">
                            {/* title */}
                            <h1 className="mx-auto text-xl font-semibold mb-8">
                                Simulate Your Loan
                            </h1>
                            <p className="mb-8">
                                How much would you like to borrow
                            </p>

                            {/* loan amount slider */}
                            <div className="  w-full flex justify-center itens-center flex-col  rounded-md">
                                <div className="grid grid-cols-3 mb-1 ">
                                    <h1 className="text-sm font-medium text-gray-400 ">
                                        50,000
                                    </h1>
                                    <h1 className="text-sm font-medium text-primaryColor text-center ">
                                        {formatMoney(loanvalue)}
                                    </h1>

                                    <h1 className="text-sm font-medium text-gray-400 text-right ">
                                        10,000,000
                                    </h1>
                                </div>
                                <div className="relative">
                                    <input
                                        type="range"
                                        min={50000}
                                        max={10000000}
                                        className={` h-2.5 slider rounded-full transition-all duration-700 ease-in-out w-full mt-5`}
                                        value={loanvalue}
                                        onChange={(e) => {
                                            setloanvalue(
                                                parseFloat(e.target.value)
                                            );
                                        }}
                                    />
                                    <div className="absolute left-0 right-0 bottom-2  h-1  pointer-events-none z-10">
                                        <div
                                            style={{
                                                maxWidth:
                                                    Math.floor(
                                                        (loanvalue / 10000000) *
                                                            100
                                                    ).toString() + "%",
                                            }}
                                            className={` h-1  bg-secondaryColor pointer-events-none  `}
                                        />
                                    </div>
                                </div>
                            </div>

                            <p className="my-8">For how long?</p>
                            {/* tenor */}
                            <div className=" w-full  flex justify-center flex-col  rounded-md">
                                <div className="grid grid-cols-3 mb-1">
                                    <h1 className="text-sm font-medium text-gray-400 ">
                                        0
                                    </h1>
                                    <h1 className="text-sm font-medium text-primaryColor text-center ">
                                        {`${tenorvalue} days`}
                                    </h1>
                                    <h1 className="text-sm font-medium text-gray-400 text-right ">
                                        180 days
                                    </h1>
                                </div>
                                <div className="p-0  relative ">
                                    <input
                                        type="range"
                                        min={"0"}
                                        max="180"
                                        className={` h-2.5 slider rounded-full transition-all duration-700 ease-in-out w-full mt-5 relative`}
                                        value={tenorvalue}
                                        step={30}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (parseFloat(value) < 30) {
                                                settenorvalue(30);
                                            } else {
                                                settenorvalue(
                                                    parseFloat(e.target.value)
                                                );
                                            }
                                        }}
                                    />
                                    <div className="absolute left-0 right-0 bottom-2  h-1  pointer-events-none z-10">
                                        <div
                                            style={{
                                                maxWidth:
                                                    Math.floor(
                                                        (tenorvalue / 180) * 100
                                                    ).toString() + "%",
                                            }}
                                            className={` h-1  bg-secondaryColor pointer-events-none transition-all `}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between -mt-1 px-[9px] ">
                                    <div className="w-1 h-4" />
                                    <div className="w-1 h-4 bg-gray-300 rounded-xl" />
                                    <div className="w-1 h-4 bg-gray-300 rounded-xl " />
                                    <div className="w-1 h-4 bg-gray-300 rounded-xl " />
                                    <div className="w-1 h-4 bg-gray-300 rounded-xl " />
                                    <div className="w-1 h-4 bg-gray-300 rounded-xl " />
                                    <div className="w-1 h-4" />
                                </div>
                            </div>
                            {/* values */}
                            <div className="space-y-2 my-7">
                                <div className="p-4 bg-bgColor4">
                                    Monthly Payment:{" "}
                                    <span className="text-primaryColor  font-semibold">
                                        {"N " +
                                            formatMoney(
                                                (loanvalue + interest) /
                                                    (tenorvalue / 30)
                                            )}
                                    </span>
                                </div>
                                <div className="p-4 bg-bgColor4">
                                    Total to be refunded:{" "}
                                    <span className="text-primaryColor  font-semibold">
                                        {"N " +
                                            formatMoney(loanvalue + interest)}
                                    </span>
                                </div>
                                <div className=" p-4 bg-bgColor4">
                                    Interest included:{" "}
                                    <span className="text-primaryColor  font-semibold">
                                        {"N " + formatMoney(interest)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className=" absolute top- z-10">
            <LoanCalculator/>
            </div> */}
                </div>
            </div>
        </div>
    );
}

export default Header;
