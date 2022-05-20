import React from "react";
import { Link } from 'react-router-dom';
// layout
import DefaultLayout from "../components/layout/DefaultLayout";

//components
import { Header } from "../components/pages/LoanContract";
import { Information, TopBar } from "../components/pages/LoanInformation";
function LoanContract() {
    return (
        <DefaultLayout>
            <>
                <TopBar />
                <Header />
                <Information />




                <div className=" pt-5 space-x-6">
                    <Link to="/dashboard">
                        <button
                            className="border text-right px-5 py-4 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all"
                            type="submit"
                        >
                            Accept
                        </button>
                    </Link>
                    <Link to="/dashboard">
                        <button
                            className="border px-5 py-4 bg-white border-black text-darkTextColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all"
                            type="submit"
                        >
                            Decline
                        </button>
                    </Link>

                </div>
            </>
        </DefaultLayout>
    );
}

export default LoanContract;
