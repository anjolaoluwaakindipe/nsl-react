import React from "react";
import { Header, Form } from "../components/pages/CreateAccount";
import DefaultLayout from "../components/layout/DefaultLayout";

function CreateAccount() {
    return (
        <DefaultLayout>
            <>
                <Header />
                <Form />
            </>
        </DefaultLayout>
    );
}    

export default CreateAccount;
