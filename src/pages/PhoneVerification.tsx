import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import {
    Header,
    PhoneVerificationPinCode,
} from "../components/pages/PhoneVerification";

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
            Joi.object({
                phoneCode: Joi.string()
                    .required()
                    .label("Phone Code")
                    .min(4)
                    .max(4),
            })
        ),
    });
    const onProceed = () => {
        navigate("/login", { replace: true });
    };

    const { openModalFunc } = useModal(
        "PhoneEmailVerificationSuccessModal",
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
                <form
                    onSubmit={onSubmit}
                    autoComplete="off"
                    autoSave="off"
                    autoCorrect="off"
                >
                    <div className="pt-20 w-full md:w-1/2 space-y-6">
                        <div>
                            <Controller
                                name="phoneCode"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneVerificationPinCode
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            <p className="error1 mt-1">
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
