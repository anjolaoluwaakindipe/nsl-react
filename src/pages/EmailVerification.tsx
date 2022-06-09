import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";
import { Header } from "../components/pages/EmailVerification";
import EmailVerificationPinCode from "../components/pages/EmailVerification/EmailVerificationPinCode";
import { useModal } from "../services/customHooks/useModal";
import { paths } from "../utils/constants/allPaths";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { signUpInfoSelector } from "../state/signUpInfoSlice";

function EmailVerification() {
    const { email, fullName, password, phoneNumber } =
        useSelector(signUpInfoSelector);
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            emailCode: "",
        },
        resolver: joiResolver(
            Joi.object({
                emailCode: Joi.string()
                    .required()
                    .min(4)
                    .max(4)
                    .label("Email Code"),
            })
        ),
    });

    useEffect(() => {
        if (!email || !fullName || !password || !phoneNumber) {
            navigate(paths.CREATE_ACCOUNT, { replace: true });
        }
    }, [email,fullName, password, phoneNumber  ]); // eslint-disable-line

    const { openModalFunc } = useModal("EmailVerificationSuccessModal", false);

    const onSubmit = handleSubmit((data) => {
        openModalFunc();
    });

    return (
        <HalfNavBarLayout>
            <>
                <Header />

                {/* Text field and Resend section */}

                <form onSubmit={onSubmit}>
                    <div className="pt-10 md:pt-20 w-full flex flex-col items-center space-y-6">
                        <div className="flex flex-col items-center">
                            <Controller
                                name="emailCode"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <EmailVerificationPinCode
                                            value={value}
                                            onChange={onChange}
                                        />
                                    );
                                }}
                            />

                            <p className="error1 mt-2">
                                {errors.emailCode?.message}
                            </p>
                        </div>

                        <h6>
                            Didn't get code?{" "}
                            <Link className="text-primaryColor" to={"/"}>
                                Resend Code
                            </Link>
                        </h6>
                    </div>

                    {/* button */}
                    <div className="w-full pt-20 space-y-4">
                        <button
                            type="submit"
                            className="w-full btn1"
                            onClick={() => {}}
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

export default EmailVerification;
