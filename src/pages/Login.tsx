import React from "react";

// layouts
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

// components
import { Form, Header } from "../components/pages/Login";

function Login() {
    return (
        <HalfNavBarLayout>
            <div className="md:px-10">
                <Header />
                <Form />
            </div>
        </HalfNavBarLayout>
    );
}

export default Login;
