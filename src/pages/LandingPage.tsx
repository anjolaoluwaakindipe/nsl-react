import React from "react";

import {
    Header,
    Footer3,
    Layout,
    Form,
    LoanCalculator,
    Faq,
    Footer2,
    Footer,
    LoanProcess,
} from "../components/pages/LandingPage";

function LandingPage() {
    return (
        <Layout>
            <div className="">
                <Header />

                <LoanCalculator />
                <LoanProcess />

                <Faq />
                <Footer2 />

                <div className="md:px-0">
                    <Footer />
                </div>
                {/* <Footer3/> */}
            </div>
        </Layout>
    );
}

export default LandingPage;
