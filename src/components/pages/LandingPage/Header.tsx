import React from "react";
import LoanCalculator from "./LoanCalculator";


function Header() {
    return (
        <div className="relative py-4">

            <img
            src="/assets/dots.svg"
            className="absolute top-8 left-4 z-0 w-20"
            />
             <img
                src="/assets/landingguy.svg"
                alt="logo"
                className="object-contain w-10 md:w-96 float-right absolute top-3 right-4 "

            />
            <div className="text-primaryColor font-bold text-4xl z-10 px-11 py-14 relative bottom-2 left-3">
            <span className="font-normal">S</span>ecure, <span className="font-normal">F</span>ast, <span className="font-normal">R</span>eliable 
            <p>
            <span className="font-normal"> and E</span>ffective.
            </p>


            <p className="text-darkTextColor font-normal text-sm py-10">
                Lörem ipsum räst social selling, kassalösa butiker fer i vittneslitteratur. 
                <p> Tosm röserade: trilig astronar. Ögosade ivis, #metoo om.</p>
            </p>

            </div>
            

          {/* <LoanCalculator/> */}

           
        </div>
    );
}

export default Header;