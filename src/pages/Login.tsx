import React from "react";

// layouts
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import { Form, Header } from "../components/pages/Login";

function Login() {
    return (
        <DefaultLayout>
            <div className="md:px-10">
                <Header />
                <Form />
            </div>
        </DefaultLayout>
    );
}

export default Login;
