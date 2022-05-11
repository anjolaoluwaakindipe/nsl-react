import React from "react";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

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