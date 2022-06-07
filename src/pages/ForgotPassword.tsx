import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Header from "../components/pages/ForgotPassword/Header";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: { email: "" },
        resolver: joiResolver(
            Joi.object({
                email: Joi.string()
                    .email({ tlds: { allow: false } })
                    .required()
                    .label("Email"),
            })
        ),
    });

    const onSubmit = handleSubmit((data) => {});
    return (
        <HalfNavBarLayout>
            <>
                <Header />

                {/* Text field and Resend section */}

                <form onSubmit={onSubmit} className="pt-20">
                    <div className=" w-full text-base  md:text-xl ">
                        <div className="border-0 border-b-2  border-underlineColor">
                            <label htmlFor="ForgotPassword__email"></label>
                            <input
                                type="text"
                                {...register("email")}
                                id="ForgotPassword__email"
                                className="outline-none pb-4  border-0 "
                                placeholder="Email Address"
                            />
                        </div>
                        <p className="text-xs text-red-900 ">
                            {errors.email?.message}
                        </p>
                    </div>

                    {/* button */}
                    <div className="w-full pt-20">
                        <button
                            type="submit"
                            className="w-full btn1"
                            disabled={!isDirty}
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </>
        </HalfNavBarLayout>
    );
}

export default ForgotPassword;
