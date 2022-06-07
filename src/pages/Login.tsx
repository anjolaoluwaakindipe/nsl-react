import React from "react";

// layouts
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

// components
import { Form, Header } from "../components/pages/Login";

function Login() {
    return (
        <HalfNavBarLayout>
            <>
                <Header />
                <Form />
            </>
        </HalfNavBarLayout>
    );
}

export default Login;
