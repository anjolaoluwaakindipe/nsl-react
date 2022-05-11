import React from "react";

// layout
import DefaultLayout from "../components/layout/DefaultLayout";


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