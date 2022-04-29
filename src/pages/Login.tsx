import React from "react";

// layouts
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import { Form, Header } from "../components/pages/Login";

function Login() {
    return (
        <DefaultLayout>
            <>
                <Header />
                <Form />
            </>
        </DefaultLayout>
    );
}

export default Login;
