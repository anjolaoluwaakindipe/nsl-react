import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// layout
import DefaultLayout from "../components/layout/DefaultLayout";

//components
import { Header } from "../components/pages/LoanContract";
import PinCode from "../components/pages/LoanContract/PinCode";
import TermsAndAgreement from "../components/pages/LoanContract/TermsAndAgreement";
import { Information, TopBar } from "../components/pages/LoanInformation";
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

                    <div className=" pt-5 space-x-6">
                        <button
                            className="border text-right px-5 py-4 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all"
                            type="submit"
                        >
                            Accept
                        </button>

                        <Link to="/dashboard">
                            <button className="border px-5 py-4 bg-white border-black text-darkTextColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all">
                                Decline
                            </button>
                        </Link>
                    </div>
                </form>
            </>
        </DefaultLayout>
    );
}

export default LoanContract;
