import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";
import { Header } from "../components/pages/EmailVerification";
import EmailVerificationPinCode from "../components/pages/EmailVerification/EmailVerificationPinCode";
import { useModal } from "../services/customHooks/useModal";
import { verificationRequests } from "../services/requests/verificationRequests";
import { authSelector, createUserFull } from "../state/redux/authSlice";
import {
    clearSignUpInfo,
    setEmailCode,
    signUpInfoSelector,
} from "../state/redux/signUpInfoSlice";
import { AppDispatch } from "../state/redux/store";
import { paths } from "../utils/constants/allPaths";

function EmailVerification() {
    // signUpInfo selector
    const {
        email,
        firstName,
        password,
        phoneNumber,
        emailCode,
        bvn,
        dateOfBirth,
        lastName,
        gender,
    } = useSelector(signUpInfoSelector);

    // loading state variables
    const { isLoading, isSuccess, errorMessage, isError } =
        useSelector(authSelector);

    // react router variables
    const navigate = useNavigate();

    // react redux variables
    const dispatch = useDispatch<AppDispatch>();

    // button state
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const toastId = "email-verification-toastId";

    // react-hook-forms
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            emailCode: ["", "", "", ""],
        },
        resolver: joiResolver(
            Joi.object({
                emailCode: Joi.array()
                    .required()
                    .min(4)
                    .max(4)
                    .label("Email Code"),
            })
        ),
    });



    useEffect(() => {
        toast("Please make sure code is 4 digits", {
            position: "top-right",
            id:toastId
        });

        return () =>{
            toast.remove(toastId)
        }
    }, []);

    const inputedEmailCode = watch("emailCode");

    useEffect(() => {
        if (!email || !firstName || !password || !phoneNumber) {
            navigate(paths.CREATE_ACCOUNT, { replace: true });
        }
    }, [email, firstName, password, phoneNumber]); // eslint-disable-line

    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    useEffect(() => {
        setIsButtonDisable(true);
        if (
            inputedEmailCode.join("").length === 4 &&
            inputedEmailCode.join("") === emailCode
        ) {
            clearTimeout(timerRef.current!);
            toast.loading("Verifying Code...", {
                id: toastId,
                position: "top-right",
            });
            timerRef.current = setTimeout(() => {
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

        if (
            inputedEmailCode.join("").length === 4 &&
            inputedEmailCode.join("") !== emailCode
        ) {
            clearTimeout(timerRef.current!);
            toast.loading("Verifying Code...", {
                id: toastId,
                position: "top-right",
            });
            timerRef.current = setTimeout(() => {
                toast.error("Code not correct", {
                    position: "top-right",
                    id: toastId,
                });
            }, 3000);
        }
    }, [inputedEmailCode, emailCode]); //eslint-disable-line

    //correct
    const { openModalFunc } = useModal(
        "PhoneEmailVerificationSuccessModal ",
        false
    );

    const resendEmailVerificationCode = async () => {
        const newEmailCode = verificationRequests.generateVerificationCode();

         if (inputedEmailCode.join("") === emailCode) {
             toast.success("Inputed code is already correct");
             return;
         }
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
                    toast.error(
                        "Something went wrong while sending a new verification code to your email. Please try again later",
                        { id: loadingToastId }
                    );
                });
    };

    // checks if account creation was successful or not
    useEffect(() => {
        if (!isLoading && isSuccess) {
            setButtonLoading(false);
            dispatch(clearSignUpInfo);
            openModalFunc();
        }
        if (!isLoading && isError && errorMessage) {
            setButtonLoading(false);
        }
    }, [isLoading, openModalFunc]); //

    const onSubmit = handleSubmit(async (data) => {
        setButtonLoading(true);
        await dispatch(
            createUserFull({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                bvn: bvn.trim(),
                dateOfBirth: dateOfBirth.trim(),
                gender: gender?.value?.trim()!,
                email: email.trim(),
                phoneNumber: phoneNumber.trim(),
                password: password.trim(),
            })
        );
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
