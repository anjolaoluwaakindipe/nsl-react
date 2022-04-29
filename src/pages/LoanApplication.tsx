import React from "react";
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import { Form, Header, TopBar } from "../components/pages/LoanApplication";

function LoanApplication() {
    return (
        <DefaultLayout>
            <>
                <TopBar />
                <Header />
                <Form />
            </>
        </DefaultLayout>
    );
}

export default LoanApplication;
