import React from "react";
import { Controller, useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { paths } from "../utils/constants/allPaths";
// layout
import DefaultLayout from "../components/layout/DefaultLayout";

//components
import { Header, TopBar, Information } from "../components/pages/LoanContract";
import PinCode from "../components/pages/LoanContract/PinCode";
import TermsAndAgreement from "../components/pages/LoanContract/TermsAndAgreement";
//import { Information} from "../components/pages/LoanInformation";
function LoanContract() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<{ pin: string }>({
        defaultValues: {
            pin: "",
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
const navigate = useNavigate();
    return (
        <DefaultLayout>
            <>
                <TopBar />
                <Header />
                <Information />
                <TermsAndAgreement />

                <form onSubmit={onSubmit}>
                    <div className="space-y-5">
                        <Controller
                            control={control}
                            name="pin"
                            rules={{
                                minLength: {
                                    value: 4,
                                    message:
                                        "Please make sure that pin is 4 digits long",
                                },
                                maxLength: {
                                    value: 4,
                                    message:
                                        "Please make sure that pin is 4 digits long",
                                },
                            }}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <PinCode
                                        value={value}
                                        onChange={onChange}
                                    />
                                );
                            }}
                        />

                        <p className="error1"> {errors.pin?.message}</p>
                    </div>

                    <div>
                        {/* <h2 className="text-primaryColor font-semibold hover:underline cursor-pointer text-sm">
                            Generate Code
                        </h2> */}
                        <h2 className="text-primaryColor font-semibold hover:underline cursor-pointer text-sm">
                            Resend Code
                        </h2>
                    </div>

                <div className=" pt-10 space-x-6 w-full ">
                        <button className="btn1 md:w-52 w-1/2" type="submit"
                        onClick={()=>{navigate(-1)}}>
                            Accept
                        </button>

                        
                            <button className="btn1 bg-transparent border-primaryColor border-2 w-1/2 md:w-52"
                              onClick={()=>{navigate(paths.USER_DASHBOARD)}}>
                                Cancel
                            </button>
                      
                    </div>
                </form>
            </>
        </DefaultLayout>
    );
}

export default LoanContract;
