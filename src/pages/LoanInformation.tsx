import React from "react";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// icons
import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

//components
 import { Header, Information, TopBar } from "../components/pages/LoanInformation";


function LoanInformation(){
    return (
        <DefaultLayout>
            <>
            <TopBar/>
            <Header />
            <Information/>
            </>
        </DefaultLayout>
    );
}

export default LoanInformation;