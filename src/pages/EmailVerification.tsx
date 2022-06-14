import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTokenSourceMapRange } from "typescript";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";
import { Header } from "../components/pages/EmailVerification";
import EmailVerificationPinCode from "../components/pages/EmailVerification/EmailVerificationPinCode";
import { useModal } from "../services/customHooks/useModal";
import {
    clearSignUpInfo,
    setEmailCode,
    setSmsCode,
    signUpInfoSelector,
} from "../state/signUpInfoSlice";
import { paths } from "../utils/constants/allPaths";
import { verificationRequests } from "../services/requests/verificationRequests";
import { AppDispatch } from "../state/store";
import { authSelector, createUser } from "../state/authSlice";

function EmailVerification() {
    const { email, fullName, password, phoneNumber, emailCode } =
        useSelector(signUpInfoSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const [toastId, setToastId] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    // substiute
    const { isLoading, isSuccess, errorMessage, isError } =
        useSelector(authSelector);

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
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
        setToastId(
            toast("Please make sure code is 4 digits", {
                position: "top-right",
            })
        );
    }, []);

    const inputedEmailCode = watch("emailCode");

    // const infoToast = toast("Please make sure code is 4 digits", {
    //     position: "top-right",
    // });

    useEffect(() => {
        if (!email || !fullName || !password || !phoneNumber) {
            navigate(paths.CREATE_ACCOUNT, { replace: true });
        }
    }, [email, fullName, password, phoneNumber]); // eslint-disable-line

    useEffect(() => {
        setIsButtonDisable(true);
        if (inputedEmailCode.length === 4 && inputedEmailCode === emailCode) {
            toast.dismiss(toastId);
            toast.loading("Verifying Code...", {
                id: toastId,
                position: "top-right",
            });
            setTimeout(() => {
                toast.success("Email verification code correct", {
                    position: "top-right",
                    id: toastId,
                    duration: 8000,
                });
                setIsButtonDisable(false);
            }, 3000);
        }

        if (inputedEmailCode.length !== 4) {
            setIsButtonDisable(true);
        }

        if (inputedEmailCode.length === 4 && inputedEmailCode !== emailCode) {
            toast.dismiss(toastId);
            toast.loading("Verifying Code...", {
                id: toastId,
                position: "top-right",
            });
            setTimeout(() => {
                toast.error("Code not correct", {
                    position: "top-right",
                    id: toastId,
                });
            }, 3000);
        }
    }, [inputedEmailCode, emailCode]); //eslint-disable-line

    //correct
    const { openModalFunc } = useModal("EmailVerificationSuccessModal", false);

    // // substitute
    // const { openModalFunc } = useModal(
    //     "PhoneEmailVerificationSuccessModal",
    //     false
    // );

    // // substitute
    // // checks if account creation was successful or not
    // useEffect(() => {
    //     if (!isLoading && isSuccess) {
    //         toast.success("Account creation Successful please Login in");
    //         setButtonLoading(false);
    //         dispatch(clearSignUpInfo);
    //         openModalFunc();
    //     }
    //     if (!isLoading && isError) {
    //         toast.error(errorMessage);
    //         setButtonLoading(false);
    //     }

    //     if (
    //         !isLoading &&
    //         isError &&
    //         errorMessage ===
    //             "User already exists. Please try again with another email"
    //     ) {
    //         toast.error(errorMessage);
    //         dispatch(clearSignUpInfo);
    //         navigate(paths.CREATE_ACCOUNT);
    //     }
    // }, [isLoading, openModalFunc]); // eslint-disable-line

    const resendEmailVerificationCode = async () => {
        const newEmailCode = verificationRequests.generateVerificationCode();
        const loadingToastId = toast.loading(
            "Sending a new code to your email...",
            {
                position: "top-right",
            }
        );

        await verificationRequests
            .verifyEmail({
                fourDigitCode: newEmailCode,
                toEmail: email,
            })
            .then((res) => {
                dispatch(setEmailCode({ emailCode: newEmailCode }));
                toast.success("New verification code sent to your email.", {
                    id: loadingToastId,
                });
            })
            .catch((err) => {
                console.log("hello");
                toast.error(
                    "Something went wrong while sending a new verification code to your email. Please try again later",
                    { id: loadingToastId }
                );
            });
    };

    const onSubmit = handleSubmit(async (data) => {
        setButtonLoading(true);

        const phoneCode = verificationRequests.generateVerificationCode();
        const loadingToastId = toast.loading(
            "Sending code to your phone number",
            { position: "top-right" }
        );

        const verificationResponse = await verificationRequests
            .verifyEmail({ fourDigitCode: phoneCode, toEmail: email })
            .then((res) => {
                // if (res.data.sentOk === true) {
                dispatch(setSmsCode({ smsCode: phoneCode }));
                toast.success("Verification code sent to your phone", {
                    id: loadingToastId,
                });
                openModalFunc();
                // } else {
                //     toast.error(
                //         "Could not send sms to the phone number given. Please go back and try again",
                //         { id: loadingToastId }
                //     );
                //     setButtonLoading(false);
                // }
            })
            .catch((err) => {
                console.log("hello");
                toast.error(
                    "Something went wrong while sending verification code. Please try again later",
                    { id: loadingToastId }
                );
                setButtonLoading(false);
            });
        console.log(verificationResponse);

        // // substitute
        // setButtonLoading(true);
        // await dispatch(
        //     createUser({
        //         fullName: fullName.trim(),
        //         email: email.trim(),
        //         phoneNumber: phoneNumber.trim(),
        //         password: password.trim(),
        //     })
        // );
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
                            <span
                                className="text-primaryColor hover:undeline cursor-pointer"
                                onClick={resendEmailVerificationCode}
                            >
                                Resend Code
                            </span>
                        </h6>
                    </div>

                    {/* button */}
                    <div className="w-full pt-20 space-y-4">
                        <button
                            type="submit"
                            className="w-full btn1"
                            onClick={() => {}}
                            disabled={isButtonDisable || buttonLoading}
                        >
                            {buttonLoading ? "Loading..." : "Verify"}
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
