import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SingleTextField from "../components/shared/TextFields/SingleTextField";
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import { Header } from "../components/pages/PhoneVerification";

// form
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useModal } from "../services/customHooks/useModal";

function PhoneVerification() {
    const navigate = useNavigate();

    // component state
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { phoneCode: "" },
        resolver: joiResolver(
            Joi.object({ phoneCode: Joi.string().required() })
        ),
    });
    const onProceed = () => {
        navigate("/phone-verification", { replace: true });
    };

    const { openModalFunc } = useModal(
        "SuccessPhoneAndEmailVerificationModal",
        false,
        () => {
            onProceed();
        }
    );

    const onSubmit = handleSubmit((data) => {
        openModalFunc();
    });

    return (
        <DefaultLayout>
            <>
                <Header />
                <form onSubmit={onSubmit} autoComplete="off" autoSave="off">
                    <div className="pt-20 w-full md:w-1/2 space-y-6">
                        <div>
                            <Controller
                                name="phoneCode"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <SingleTextField
                                        placeholder="Verification Code"
                                        onChange={onChange}
                                        value={value}
                                        maxLength={6}
                                    />
                                )}
                            />
                            <p className="error1">
                                {errors.phoneCode?.message}
                            </p>
                        </div>

                        <h6>
                            Didn't get code?{" "}
                            <Link className="text-accentColor" to={"/"}>
                                Resend
                            </Link>
                        </h6>
                    </div>

                    <div className="w-full pt-20">
                        <button
                            className=" w-full md:w-1/2 btn1"
                            onClick={() => {}}
                            type="submit"
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </>
        </DefaultLayout>
    );
}

export default PhoneVerification;
