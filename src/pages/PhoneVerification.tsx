import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

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
import { paths } from '../utils/constants/allPaths';

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
  

    const { openModalFunc } = useModal(
        "PhoneEmailVerificationSuccessModal",
        false,
    
    );

    const onSubmit = handleSubmit((data) => {
        openModalFunc();
    });

    return (
        <HalfNavBarLayout>
            <>
                <Header />
                <form
                    onSubmit={onSubmit}
                    autoComplete="off"
                    autoSave="off"
                    autoCorrect="off"
                >
                    <div className="pt-10 md:pt-20 w-full flex flex-col items-center space-y-6">
                        <div className="flex flex-col items-center">
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
                            <p className="error1 mt-2">
                                {errors.phoneCode?.message}
                            </p>
                        </div>

                        <h6>
                            Didn't get code?{" "}
                            <Link
                                className="text-primaryColor hover:underline"
                                to={"/"}
                            >
                                Resend
                            </Link>
                        </h6>
                    </div>

                    <div className="w-full pt-20 space-y-4">
                        <button
                            className=" w-full  btn1"
                            onClick={() => {}}
                            type="submit"
                        >
                            Verify
                        </button>
                        <h6 className="text-center md:text-xl w-full ">
                            Already have an account?{" "}
                            <span className="text-primaryColor hover:underline">
                                <Link to={paths.LOGIN}>Sign in</Link>
                            </span>
                        </h6>
                    </div>
                </form>
            </>
        </HalfNavBarLayout>
    );
}

export default PhoneVerification;
