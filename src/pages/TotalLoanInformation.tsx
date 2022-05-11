import React from "react";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// icons
import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

//components 
import {Header, TopBar, Fields} from "../components/pages/TotalLoanInformation";

function TotalLoanInformation(){
    return (
        <DefaultLayout>
            <>
            <TopBar/>
            <Header/>
            <Fields/>
            </>


        </DefaultLayout>
    );
}

export default TotalLoanInformation;