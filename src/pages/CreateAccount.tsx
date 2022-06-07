import React from "react";
import { Header, Form } from "../components/pages/CreateAccount";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

function CreateAccount() {
    return (
        <HalfNavBarLayout>
            <>
                <Header />
                <Form />
            </>
        </HalfNavBarLayout>
    );
}    

export default CreateAccount;
