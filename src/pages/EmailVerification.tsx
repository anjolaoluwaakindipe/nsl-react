import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import DefaultLayout from "../components/layout/DefaultLayout";
import SingleTextField from "../components/shared/TextFields/SingleTextField";
import { Header } from "../components/pages/EmailVerification";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

function EmailVerification() {
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            emailCode:"",
        },
        resolver: joiResolver(
            Joi.object({
                emailCode: Joi.string().required().label("The code"),
            })
        ),
    });

    const onSubmit = handleSubmit((data) => {
        
        navigate("/phone-verification", {replace:true})
    });

    return (
        <DefaultLayout>
            <>
                <Header />

                {/* Text field and Resend section */}

                <form onSubmit={onSubmit}>
                    <div className="pt-20 w-full md:w-1/2 space-y-6">
                        <div>
                            <Controller
                                name="emailCode"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <SingleTextField
                                            placeholder="Verification Code"
                                            onChange={onChange}
                                            value={value}
                                            maxLength={6}
                                        />
                                    );
                                }}
                            />

                            <p className="error1">
                                {errors.emailCode?.message}
                            </p>
                        </div>

                        <h6>
                            Didn't get code?{" "}
                            <Link className="text-accentColor" to={"/"}>
                                Resend
                            </Link>
                        </h6>
                    </div>

                    {/* button */}
                    <div className="w-full pt-20">
                        <button
                            type="submit"
                            className="w-1/2 btn1"
                            onClick={() => {}}
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </>
        </DefaultLayout>
    );
}

export default EmailVerification;
