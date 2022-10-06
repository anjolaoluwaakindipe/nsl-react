import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/redux/authSlice";
import { loanSelector } from "../../../state/redux/loanSlice";

function Header() {
    const user = useSelector(authSelector).user;
    const selectedLoan = useSelector(loanSelector).selectedLoanApplication;
    return (
        <form>
            <div className="space-y-5 pt-10 ">
                <h1 className="heading1 text-primaryColor dark:">
                    Loan Contract
                </h1>
            </div>

            <div className="pt-8 py-10">
                <h3 className="font-bold text-justify text-accentColor dark:">
                    {`${user?.lastName?.toLocaleUpperCase()} ${user?.firstName?.toLocaleUpperCase()} ${user?.middleName?.toLocaleUpperCase()}`}
                </h3>

                <span className="bg-primaryColor text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:">
                    {" "}
                    Status
                </span>
                <span className="font-sm dark:">
                    {selectedLoan?.status || ""}
                </span>
            </div>
        </form>
    );
}

export default Header;
