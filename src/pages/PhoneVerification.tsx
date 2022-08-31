import { Link, useNavigate } from "react-router-dom";
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";

// components
import {
    Header,
    PhoneVerificationPinCode,
} from "../components/pages/PhoneVerification";

// form
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../services/customHooks/useModal";
import { verificationRequests } from "../services/requests/verificationRequests";
import {
    setEmailCode,
    setSmsCode,
    signUpInfoSelector,
} from "../state/redux/signUpInfoSlice";
import { AppDispatch } from "../state/redux/store";
import { paths } from "../utils/constants/allPaths";

function PhoneVerification() {
    // sign up state variables
    const {
        email,
        firstName,
        lastName,
        bvn,
        dateOfBirth,
        gender,
        password,
        phoneNumber,
        smsCode,
    } = useSelector(signUpInfoSelector);

    // navigation (react-router)
    const navigate = useNavigate();

    // react redux
    const dispatch = useDispatch<AppDispatch>();

    // button state
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    // toast id
    const pinToastId = "pinToastId";

    // sends a toast message to advice the user to input a 4 digits code
    // useEffect(() => {}, []);

    // component state
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: { phoneCode: ["", "", "", ""] },
        resolver: joiResolver(
            Joi.object({
                phoneCode: Joi.array()
                    .required()
                    .label("Phone Code")
                    .min(4)
                    .max(4),
            })
        ),
    });

    const inputedSmsCode = watch("phoneCode");
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    // checks if inputed code matches code sent to phone number
    useEffect(() => {
        setIsButtonDisable(true);
        if (
            inputedSmsCode.join("").length === 4 &&
            inputedSmsCode.join("") === smsCode
        ) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            toast.loading("Verifying Code...", {
                id: pinToastId,
                position: "top-right",
            });
            timerRef.current = setTimeout(() => {
                toast.success("Sms verification code correct", {
                    position: "top-right",
                    id: pinToastId,
                    duration: 8000,
                });
                setIsButtonDisable(false);
            }, 3000);
        }

        if (inputedSmsCode.length !== 4) {
            setIsButtonDisable(true);
        }

        if (
            inputedSmsCode.join("").length === 4 &&
            inputedSmsCode.join("") !== smsCode
        ) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            toast.loading("Verifying Code...", {
                id: pinToastId,
                position: "top-right",
            });
            timerRef.current = setTimeout(() => {
                toast.error("Code not correct", {
                    position: "top-right",
                    id: pinToastId,
                });
            }, 3000);
        }
    }, [inputedSmsCode, smsCode]); //eslint-disable-line

    // allows users to resend another verifciation code to their phone number
    const resendSmsVerificationCode = async () => {
        const newSmsCode = verificationRequests.generateVerificationCode();
        const copyPhoneNumber = phoneNumber;

        if (inputedSmsCode.join("") === smsCode) {
            toast.success("Inputed code is already correct");
            return;
        }

        const loadingToastId = toast.loading(
            "Sending a new code to your phone number...",
            {
                position: "top-right",
            }
        );

        await verificationRequests
            .verifySms({
                fourDigitCode: newSmsCode,
                recipientPhoneNumber: copyPhoneNumber.replace("+", ""),
            })
            .then((res) => {
                dispatch(setSmsCode({ smsCode: newSmsCode }));
                toast.success(
                    "New verification code sent to your phone number.",
                    {
                        id: loadingToastId,
                    }
                );
            })
            .catch((err) => {
                toast.error(
                    "Something went wrong while sending a new verification code to your phone number. Please try again later",
                    { id: loadingToastId }
                );
            });
    };

    // checks if the registration information are still in state otherwise go back to the create account page
    useEffect(() => {
        if (
            !email ||
            !firstName ||
            !password ||
            !phoneNumber ||
            !bvn ||
            !lastName ||
            !dateOfBirth ||
            !gender
        ) {
            navigate(paths.CREATE_ACCOUNT, { replace: true });
            return;
        }

        toast("Please make sure code is 4 digits", {
            position: "top-right",
            id: pinToastId,
        });

        return () => {
            toast.remove(pinToastId);
        };
    }, [email, firstName, password, phoneNumber]); // eslint-disable-line

    const { openModalFunc } = useModal("PhoneVerificationSuccessModal", false);

    // submits user sign up information
    const onSubmit = handleSubmit(async (data) => {
        setButtonLoading(true);

        const emailCode = verificationRequests.generateVerificationCode();
        toast.loading("Sending code to your email", { id: pinToastId });
        await verificationRequests
            .verifyEmail({
                fourDigitCode: emailCode,
                toEmail: email,
            })
            .then((res) => {
                dispatch(setEmailCode({ emailCode: emailCode }));
                toast.success("Verification code sent to your email", {
                    id: pinToastId,
                });
                openModalFunc();
            })
            .catch((err) => {
                toast.error(
                    "Something went wrong while sending verification code. Please try again later",
                    { id: pinToastId }
                );
                setButtonLoading(false);
            });
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
                            Didn't get a code?{" "}
                            <span
                                className="text-primaryColor hover:underline cursor-pointer"
                                onClick={resendSmsVerificationCode}
                            >
                                Resend
                            </span>
                        </h6>
                    </div>

                    <div className="w-full pt-20 space-y-4">
                        <button
                            className=" w-full  btn1"
                            onClick={() => {}}
                            type="submit"
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

export default PhoneVerification;
