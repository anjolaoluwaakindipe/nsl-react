import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Header from "../components/pages/ForgotPassword/Header";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FloatingPlaceholderTextField from "../components/shared/TextFields/FloatingPlaceholderTextField";

function ForgotPassword() {
    const navigate = useNavigate();
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

    const onSubmit = handleSubmit((data) => { });
    return (
        <HalfNavBarLayout>
            <>
                <AiOutlineArrowLeft
                    className="text-2xl cursor-pointer pt-2 "
                    onClick={() => navigate(-1)}
                />
                <Header />

                {/* Text field and Resend section */}

                <form onSubmit={onSubmit} className="pt-20">
                    <div className=" w-full text-base  md:text-xl ">
                        <FloatingPlaceholderTextField
                            placeholder="Email Address"
                            type="text"
                            register={register}
                            registerName='Email Address'
                            id="ForgotPassword__email"
                            errorMessage={errors.email?.message}

                        />
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
