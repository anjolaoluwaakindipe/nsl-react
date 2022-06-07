import React from "react";
import { Header, Form } from "../components/pages/CreateAccount";
import DefaultLayout from "../components/layout/DefaultLayout";

function CreateAccount() {
    return (
        <DefaultLayout>
            <div className="md:px-10">
                <Header />
                <Form />
            </div>
        </DefaultLayout>
    );
}    

export default CreateAccount;
