import React from "react";
import LoanCalculator from "./LoanCalculator";

function Header() {
    return (
        <div className=" py-4 bg-peach min-h-screen ">
            <div className="max-w-[90%] mx-auto relative min-h-screen pt-32">
                <img
                    src="/assets/dots.svg"
                    className="absolute object-contain top-20 left-4 z-0 w-48"
                    alt="dots"
                />
                <img
                    src="/assets/landingguy.svg"
                    alt="logo"
                    className="object-contain xl:h-[600px] md:h-[350px] float-right absolute bottom-16 right-0 "
                />
                <div className="text-primaryColor font-bold text-2xl md:text-5xl  xl:text-7xl z-10 px-11 py-14 relative bottom-2 left-3">
                    <span className="font-normal">S</span>ecure,{" "}
                    <span className="font-normal">F</span>ast,{" "}
                    <span className="font-normal">R</span>eliable
                    <p>
                        <span className="font-normal"> and E</span>ffective.
                    </p>
                    <p className="text-darkTextColor text-md md:text-xl xl:text-3xl font-light md:max-w-md xl:max-w-xl py-10">
                        Lörem ipsum räst social selling, kassalösa butiker fer i
                        vittneslitteratur.
                        <p>
                            {" "}
                            Tosm röserade: trilig astronar. Ögosade ivis, #metoo
                            om.
                        </p>
                    </p>
                </div>

                {/* <div className=" absolute top- z-10">
            <LoanCalculator/>
            </div> */}
            </div>
        </div>
    );
}

export default Header;
