import React from "react";

import { Header, Footer, Layout, Form, LoanCalculator, Faq } from "../components/pages/LandingPage";


function LandingPage() {
    return (
        <Layout>
            <div className="md:px-20 space-y-10" >
                <Header />
                <div className="md:px-10">
                    <LoanCalculator />
                    <Form />
                    <Faq />
                </div>
                <Footer />
            </div>
        </Layout>
    )
}

export default LandingPage;
