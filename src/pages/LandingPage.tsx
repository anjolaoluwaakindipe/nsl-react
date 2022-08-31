import {
    Faq,
    Footer,
    Footer2,
    Header,
    Layout,
    LoanCalculator,
    LoanProcess,
} from "../components/pages/LandingPage";
import { useState, useCallback, useEffect, useRef } from "react";

type AllSections = "Why NSL" | "FAQs" | "OurProcess";

function LandingPage() {
    const [sectionsRef, setPagesRef] = useState<
        Record<string, React.RefObject<HTMLDivElement> | undefined>
    >({});
    const scrollToFunc = useCallback(
        (section: AllSections) => {
            if (sectionsRef[section]) {
                sectionsRef[section]?.current?.scrollIntoView({
                    behavior: "smooth",
                });
            }
        },
        [sectionsRef]
    );

    return (
        <Layout>
            <div className="">
                <Header />

                {/* <LoanCalculator /> */}
                {/* <LoanProcess /> */}
                <TopicLinkerSection scrollTo={scrollToFunc} />
                <WhyChooseNslSection setScrollerFunc={setPagesRef} />

                <LoanApplicationProcessSection setScrollerFunc={setPagesRef} />

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

type TopicLinkerProp = {
    scrollTo?: (section: AllSections) => void;
};
const TopicLinkerSection = ({ scrollTo }: TopicLinkerProp) => {
    return (
        <div className="md:pt-48 md py-24 bg-white w-full">
            <div className="border-y-[1px] border-gray-300 py-10 md:py-20 shadow-md ">
                <div className="flex-col md:flex-row max-w-max md:max-w-sm lg:max-w-xl mx-auto flex md:justify-between items-start md:items-center text-gray-500 space-y-8 md:space-y-0">
                    <div
                        className=" flex  space-x-4 items-center cursor-pointer hover:text-primaryColor"
                        onClick={() => scrollTo && scrollTo("Why NSL")}
                    >
                        <img src="assets/landingpagediamond.svg" alt="" />
                        <h1>Why NSL 24</h1>
                    </div>
                    <div
                        className=" flex space-x-4 items-center cursor-pointer hover:text-primaryColor"
                        onClick={() => scrollTo && scrollTo("FAQs")}
                    >
                        <img src="assets/landingpagelist.svg" alt="" />
                        <h1>FAQs</h1>
                    </div>
                    <div
                        className=" flex space-x-2 items-center cursor-pointer hover:text-primaryColor"
                        onClick={() => scrollTo && scrollTo("OurProcess")}
                    >
                        <img src="assets/landingpageprocess.svg" alt="" />
                        <h1>Our Process</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

type WhyChooseNslSectionProp = {
    setScrollerFunc: React.Dispatch<
        React.SetStateAction<
            Record<string, React.RefObject<HTMLDivElement> | undefined>
        >
    >;
};

const WhyChooseNslSection = ({ setScrollerFunc }: WhyChooseNslSectionProp) => {
    const sectionRef = useRef(null);
    useEffect(() => {
        setScrollerFunc((prev) => {
            return { ...prev, "Why NSL": sectionRef };
        });
    }, []);

    return (
        <div ref={sectionRef} className="w-full pt-20 pb-24 bg-white ">
            <div className="px-10 md:px-0 md:max-w-5xl mx-auto">
                <div className=" w-max mx-auto">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        Why Choose NSL24
                    </h1>
                    <div className="w-20 h-2 bg-secondaryColor float-right animate-pulse"></div>
                </div>
                <div className=" mt-10 mx-auto max-w-2xl text-center">
                    We aim at offering digital financial services to help you
                    get closer to your personal and business goals
                </div>

                <div className="w-full flex flex-col md:flex-row items-center justify-between px-10 pt-20 space-y-9 md:space-y-0">
                    <div className=" w-40 flex flex-col items-center space-y-5">
                        <img
                            src="assets/landingPageGenerousInterestRate.svg"
                            alt="generous_interest_rate_svg"
                        />
                        <h1 className="text-center font-semibold">
                            Generous Interest Rates
                        </h1>
                    </div>
                    <div className=" w-40 flex flex-col items-center space-y-5">
                        <img
                            src="assets/landingPageDisbursement.svg"
                            alt="disbursement_svg"
                        />
                        <h1 className="text-center font-semibold ">
                            Disbursement within 48 hours
                        </h1>
                    </div>
                    <div className=" w-40 flex flex-col items-center space-y-5">
                        <img
                            src="assets/landingPageHassleFree.svg"
                            alt="hassle_free_svg"
                        />
                        <h1 className="text-center font-semibold">
                            Hassel-free documentation
                        </h1>
                    </div>
                    <div className=" w-40 flex flex-col items-center space-y-5">
                        <img
                            src="assets/landingPageFlexibleRepayment.svg"
                            alt="flexible_payment_svg"
                        />
                        <h1 className="text-center font-semibold ">
                            Flexible repayment terms
                        </h1>
                    </div>
                </div>

                <div className="mt-20 mx-auto w-48 h-10 relative rounded-sm border-[1px] border-black group">
                    <button className="btn1 w-48 h-10 p-0 text-base absolute top-1 left-1 rounded-sm group-hover:top-0 group-hover:left-0 group-hover:bg-transparent ">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

type LoanApplicationProcessSectionProp = {
    setScrollerFunc: React.Dispatch<
        React.SetStateAction<
            Record<string, React.RefObject<HTMLDivElement> | undefined>
        >
    >;
};

const LoanApplicationProcessSection = ({
    setScrollerFunc,
}: LoanApplicationProcessSectionProp) => {
    const [index, setIndex] = useState(0);
    const sectionRef = useRef(null);
    const changeBgColor = (selectedIndex: number) => {
        if (selectedIndex === index) return "transition-all duration-75 ease-in  bg-secondaryColor";
        return "transition-all duration-75 ease-in";
    };
    useEffect(() => {
        setScrollerFunc((prev) => {
            return { ...prev, OurProcess: sectionRef };
        });

        const timer = setInterval(() => {
            setIndex((prev) => {
                if (prev === 3) {
                    return 0; 
                }
                return (prev += 1);
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div ref={sectionRef} className=" bg-bgColor5 py-24 flex px-10 md:px-0">
            <div className="hidden pt-10 md:block md:w-1/2 px-20 ">
                <img
                    src="assets/landingPageLoanApplicationFiller.svg"
                    alt="filler_image"
                    className="object-contain mx-auto"
                />
            </div>
            <div className=" w-full md:w-1/2  md:pr-10">
                <div className="w-full text-center  md:mx-auto">
                    <h1 className="text-3xl break-words  md:text-4xl ">
                        Loan Application Process
                    </h1>
                    <div className="mx-auto w-20 h-1 bg-secondaryColor" />
                </div>

                <div className="grid grid-cols-[100px_minmax(0,_400px)] py-10">
                    <div className="w-full h-full flex flex-col items-center">
                        <div
                            className={`${changeBgColor(
                                0
                            )} w-16 h-16 border-2 border-primaryColor flex justify-center items-center rounded-full`}
                        >
                            <img
                                src="assets/loanApplicationCreateAccount.svg"
                                alt="create_account"
                                className=""
                            />
                        </div>
                        <div className="w-1 flex-1 bg-primaryColor" />
                    </div>
                    <div className="ml-5 mt-1 space-y-2">
                        <h1 className="font-semibold">Create Account</h1>
                        <p className="">
                            {" "}
                            Sign up for an account and verify your email address
                            and phone number
                        </p>
                    </div>
                    <div className="w-full h-full flex flex-col items-center">
                        <div className="w-1 h-6 bg-primaryColor" />
                        <div
                            className={`${changeBgColor(
                                1
                            )} w-16 h-16 border-2 border-primaryColor flex justify-center items-center rounded-full`}
                        >
                            <img
                                src="assets/loanApplicationUpdateProfile.svg"
                                alt="update_profile"
                                className=""
                            />
                        </div>

                        <div className="w-1 flex-1 bg-primaryColor" />
                    </div>
                    <div className="ml-5 mt-8 space-y-2">
                        <h1 className="font-semibold">Update your Profile</h1>
                        <p className="">
                            {" "}
                            Sign up for an account and verify your email address
                            and phone number
                        </p>
                    </div>
                    <div className="w-full h-full flex flex-col items-center">
                        <div className="w-1 h-6 bg-primaryColor" />
                        <div
                            className={`${changeBgColor(
                                2
                            )} w-16 h-16 border-2 border-primaryColor flex justify-center items-center rounded-full`}
                        >
                            <img
                                src="assets/loanApplicationApplyForLoan.svg"
                                alt="apply for loan"
                                className=""
                            />
                        </div>

                        <div className="w-1 flex-1 bg-primaryColor" />
                    </div>
                    <div className="ml-5 mt-8 space-y-2">
                        <h1 className="font-semibold">Apply for a loan</h1>
                        <p className="">
                            {" "}
                            Sign up for an account and verify your email address
                            and phone number
                        </p>
                    </div>
                    <div className="w-full h-full flex flex-col items-center">
                        <div className="w-1 h-6 bg-primaryColor" />
                        <div
                            className={`${changeBgColor(
                                3
                            )} w-16 h-16 border-2 border-primaryColor flex justify-center items-center rounded-full`}
                        >
                            <img
                                src="assets/loanApplicationGetCash.svg"
                                alt="getCash"
                                className=""
                            />
                        </div>
                    </div>
                    <div className="ml-5 mt-8 space-y-2">
                        <h1 className="font-semibold">Get the cash</h1>
                        <p className="">
                            {" "}
                            Sign up for an account and verify your email address
                            and phone number
                        </p>
                    </div>
                </div>

                <div className="mt-5 mx-auto md:ml-[120px] w-48 h-10 relative rounded-sm border-[1px] border-black group">
                    <button className="btn1 w-48 h-10 p-0 text-base absolute top-1 left-1 rounded-sm group-hover:top-0 group-hover:left-0 group-hover:bg-transparent ">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
