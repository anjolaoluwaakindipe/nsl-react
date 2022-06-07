import React from "react";
import { Header, Form } from "../components/pages/CreateAccount";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

function CreateAccount() {
    return (
        <HalfNavBarLayout>
            <div className="md:px-10">
                <Header />
                <Form />
            </div>
        </HalfNavBarLayout>
    );
}    

export default CreateAccount;
