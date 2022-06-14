// react
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// react-hook-form
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { createAccountSchema } from "../../../utils/validation/createAccount";
import PhoneField from "../../shared/TextFields/PhoneField";
import { paths } from "../../../utils/constants/allPaths";
import { useModal } from "../../../services/customHooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, createUser } from "../../../state/authSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../state/store";
import { setEmailCode, setSignUpInfo } from "../../../state/signUpInfoSlice";
import { verificationRequests } from "../../../services/requests/verificationRequests";
import toast from "react-hot-toast";
type CreateAccountFormData = {
    cscsAccountNumber: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    bvn: string;
    password: string;
};

function Form() {
    const navigate = useNavigate();
    const { isLoading, isSuccess, errorMessage, isError } =
        useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();
    const [disableButton, setDisableButton] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateAccountFormData>({
        defaultValues: {
            fullName: "",
            emailAddress: "",
            phoneNumber: "",

            password: "",
        },
        resolver: joiResolver(createAccountSchema),
    });
    const { openModalFunc } = useModal("BeginVerificationModal", false);

    useEffect(() => {
        if (!isLoading && isSuccess) {
            openModalFunc();
        }
    }, [isLoading, isSuccess, isError, openModalFunc]);

    const onSubmit = handleSubmit(async (data) => {
        setDisableButton(true);
        // await dispatch(
        //     createUser({
        //         fullName: data.fullName.trim(),
        //         email: data.emailAddress.trim(),
        //         phoneNumber: data.phoneNumber.trim(),
        //         password: data.password.trim(),
        //     })
        // );

        const emailCode = verificationRequests.generateVerificationCode();
        const loading = toast.loading("Sending code to your email...", {
            position: "top-right",
        });

        const verificationResponse = await verificationRequests
            .verifyEmail({
                fourDigitCode: emailCode,
                toEmail: data.emailAddress,
            })
            .then((res) => {
                dispatch(
                    setSignUpInfo({
                        email: data.emailAddress,
                        fullName: data.fullName,
                        password: data.password,
                        phoneNumber: data.phoneNumber,
                    })
                );
                dispatch(setEmailCode({ emailCode }));
                toast.success("Verification code sent to your email", {
                    id: loading,
                });
                openModalFunc();
            })
            .catch((err) => {
                console.log("hello");
                toast.error(
                    "Something went wrong while sending verification code. Please try again later",
                    { id: loading }
                );
            });

        console.log(verificationResponse);

        // if (
        //     verificationResponse.status &&
        //     verificationResponse.status === 200
        // ) {
        //     dispatch(
        //         setSignUpInfo({
        //             email: data.emailAddress,
        //             fullName: data.fullName,
        //             password: data.password,
        //             phoneNumber: data.phoneNumber,
        //         })
        //     );
        //     dispatch(setEmailCode({ emailCode }));
        //     toast.success("Verification code sent to your email", {
        //         id: loading,
        //     });
        //     openModalFunc();
        // } else {
        //     console.log("hello")
        //     toast.error(
        //         "Something went wrong while sending verification code. Please try again later",
        //         { id: loading }
        //     );
        // }

        setDisableButton(false);
    });

    return (
        <form
            className=" grid grid-cols-12 py-20 gap-x-0 md:gap-x-10 gap-y-14 md:gap-y-28 text-darkTextColor text-base md:text-xl"
            onSubmit={onSubmit}
            autoSave={"off"}
            autoComplete={"off"}
        >
    {/*enter full name */}
            <div className="col-span-12  ">
                <div className="border-0 border-b-2  border-underlineColor">
                    <label htmlFor="fullName"></label>
                    <input
                        type="text"
                        {...register("fullName")}
                        id="CreateAccount__fullName"
                        className="outline-none pb-4  border-0  w-full"
                        placeholder="Full Name"
                    />
                </div>
                <p className="text-xs text-red-900 ">
                    {errors.fullName?.message}
                </p>
            </div>

              {/*enter email */}
            <div className="col-span-12 ">
                <div className="border-0 border-b-2   border-underlineColor">
                    <label htmlFor="email"></label>
                    <input
                        {...register("emailAddress")}
                        id="CreateAccount__email"
                        className="outline-none pb-4  w-full"
                        placeholder="Email Address"
                    />
                </div>
                <p className="text-xs text-red-900 ">
                    {errors.emailAddress?.message}
                </p>
            </div>

              {/*enter phone number */}
            <div className="col-span-12 ">
                <div className="border-0 border-b-2  border-underlineColor">
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            validate: (value) =>
                                isValidPhoneNumber(value || "") ||
                                "Not a valid International Number",
                        }}
                        render={({ field: { onChange, value } }) => (
                            <div>
                                <PhoneField
                                    placeholder="Phone Number"
                                    phoneElementClassName="pb-4 space-x-4 max-h-10"
                                    onChange={onChange}
                                    value={value}
                                    style={{ borderRadius: "0px" }}
                                />
                            </div>
                        )}
                    />
                </div>
                <p className="text-xs text-red-900 ">
                    {errors.phoneNumber?.message}
                </p>
            </div>

             {/*enter password */}
            <div className="col-span-12 ">
                <div className="border-0 border-b-2  border-underlineColor">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        {...register("password")}
                        className="outline-none pb-4   w-full"
                        placeholder="Password"
                    />
                </div>
                <p className="text-xs text-red-900 ">
                    {errors.password?.message}
                </p>
            </div>

              {/*confirm password */}
            <div className="col-span-12 ">
                <div className="border-0 border-b-2  border-underlineColor">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        {...register("password")}
                        className="outline-none pb-4   w-full"
                        placeholder="Confirm Password"
                    />
                </div>
                <p className="text-xs text-red-900 ">
                    {errors.password?.message}
                </p>
            </div>

            <div className="col-span-12 space-y-6">
                <button
                    className="btn1 w-full "
                    type="submit"
                    disabled={disableButton}
                >
                    {disableButton ? "Loading...":"Proceed"}
                </button>
                <h6 className="text-center md:text-xl w-full">
                    Already have an account?{" "}
                    <span className="text-primaryColor hover:underline">
                        <Link to={paths.LOGIN}>Sign in</Link>
                    </span>
                </h6>
            </div>
        </form>
    );
}

// cscsNumber Field

//  <div className="w-full md:col-span-6 col-span-12 ">
//      <div className="border-0 border-b-2  border-underlineColor">
//          <label htmlFor="CreateAccount__cscsAccountNumber"></label>
//          <input
//              type="text"
//              {...register("cscsAccountNumber", {
//                  required: "this is required",
//                  minLength: 2,
//              })}
//              id="CreateAccount__cscsAccountNumber"
//              className="outline-none pb-4  w-full"
//              placeholder="CSCS Account Number"
//          />
//      </div>
//      <p className="text-xs text-red-900 ">
//          {errors.cscsAccountNumber?.message}
//      </p>
//  </div>;

// bvn field

// <div className="md:col-span-6 col-span-12  ">
//     <div className="border-0 border-b-2  border-underlineColor">
//         <label htmlFor="bvn"></label>
//         <input
//             {...register("bvn")}
//             maxLength={11}
//             onKeyDown={(e) => {
//                 if (!RegExp(numbersNoDecimal).test(e.key)) {
//                     e.preventDefault();
//                 }
//             }}
//             id="CreateAccount__bvn"
//             className="outline-none pb-4  w-full"
//             placeholder="BVN"
//         />
//     </div>
//     <p className="text-xs text-red-900 ">{errors.bvn?.message}</p>
// </div>;

export default Form;
