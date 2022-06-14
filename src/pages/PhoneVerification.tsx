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
import { Controller, useForm } from "react-hook-form";
import { useModal } from "../services/customHooks/useModal";
import { paths } from "../utils/constants/allPaths";
import { useSelector, useDispatch } from "react-redux";
import { clearSignUpInfo, setSmsCode, signUpInfoSelector } from "../state/signUpInfoSlice";
import { AppDispatch } from "../state/store";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { verificationRequests } from '../services/requests/verificationRequests';
import { authSelector, createUser } from '../state/authSlice';

function PhoneVerification() {
    const { email, fullName, password, phoneNumber, smsCode } =
        useSelector(signUpInfoSelector);
    const navigate = useNavigate();
    const { isLoading, isSuccess, errorMessage, isError } =
        useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const [toastId, setToastId] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);


    // sends a toast message to advice the user to input a 4 digits code
    useEffect(() => {
        setToastId(
            toast("Please make sure code is 4 digits", {
                position: "top-right",
            })
        );
    }, []);

    // component state
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
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

    const inputedSmsCode = watch("phoneCode");

    // checks if inputed code matches code sent to phone number
    useEffect(() => {
        setIsButtonDisable(true);
        if (inputedSmsCode.length === 4 && inputedSmsCode === smsCode) {
            toast.loading("Verifying Code...", {
                id: toastId,
                position: "top-right",
            });
            setTimeout(() => {
                toast.success("Sms verification code correct", {
                    position: "top-right",
                    id: toastId,
                    duration: 8000,
                });
                setIsButtonDisable(false);
            }, 3000);
        }

        if (inputedSmsCode.length !== 4) {
            setIsButtonDisable(true);
        }

        if (inputedSmsCode.length === 4 && inputedSmsCode !== smsCode) {
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
    }, [inputedSmsCode, smsCode]); //eslint-disable-line

    // allows users to resend another verifciation code to their phone number
    const resendSmsVerificationCode = async () => {
        const newSmsCode = verificationRequests.generateVerificationCode();
        const loadingToastId = toast.loading(
            "Sending a new code to your phone number...",
            {
                position: "top-right",
            }
        );

        await verificationRequests
            .verifySms({
                fourDigitCode: newSmsCode,
                recipient: phoneNumber,
            })
            .then((res) => {
                dispatch(setSmsCode({ smsCode: newSmsCode }));
                toast.success("New verification code sent to your phone number.", {
                    id: loadingToastId,
                });
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
        if (!email || !fullName || !password || !phoneNumber) {
            navigate(paths.CREATE_ACCOUNT, { replace: true });
        }
    }, [email, fullName, password, phoneNumber]); // eslint-disable-line

    const { openModalFunc } = useModal(
        "PhoneEmailVerificationSuccessModal",
        false
    );
    
    // checks if account creation was successful or not 
    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast.success("Account creation Successful please Login in")
            setButtonLoading(false)
            dispatch(clearSignUpInfo);
            openModalFunc();
        }
        if(!isLoading && isError){
            toast.error(errorMessage);
            setButtonLoading(false);
        }

        if(!isLoading && isError && errorMessage === "User already exists. Please try again with another email"){
            toast.error(errorMessage);
            dispatch(clearSignUpInfo);
            setButtonLoading(false);
            navigate(paths.CREATE_ACCOUNT)
        }
    }, [isLoading, openModalFunc]);// eslint-disable-line


    // submits user sign up information 
    const onSubmit = handleSubmit(async(data) => {
        setButtonLoading(true)
        await dispatch(
            createUser({
                fullName: fullName.trim(),
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
                            <span
                                className="text-primaryColor hover:underline"
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
                            disabled= {isButtonDisable || buttonLoading}
                        >
                            {buttonLoading?"Loading...":"Verify"}
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
