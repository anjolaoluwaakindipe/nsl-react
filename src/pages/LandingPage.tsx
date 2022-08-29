
import {
    Faq, Footer, Footer2, Header, Layout, LoanCalculator, LoanProcess
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
