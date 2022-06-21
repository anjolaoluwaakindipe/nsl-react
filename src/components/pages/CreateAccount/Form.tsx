// react
import { Link } from "react-router-dom";

// react-hook-form
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../services/customHooks/useModal";
import { verificationRequests } from "../../../services/requests/verificationRequests";
import { authSelector } from "../../../state/authSlice";
import {
    setEmailCode,
    setSignUpInfo,
    signUpInfoSelector,
} from "../../../state/signUpInfoSlice";
import { AppDispatch } from "../../../state/store";
import { paths } from "../../../utils/constants/allPaths";
import { createAccountSchema } from "../../../utils/validation/createAccount";
import PhoneField from "../../shared/TextFields/PhoneField";
import FloatingPlaceholderTextField from "../../shared/TextFields/FloatingPlaceholderTextField";
import { numbersNoDecimal } from "../../../utils/constants/inputValidationPatterns";
import { CreateAccountFormData } from "../../../typings";

import DropDownOptions from "../../shared/Dropdowns/DropDownOptions";

function Form() {

    const genderDropdownOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    const { isLoading, isSuccess, isError } = useSelector(authSelector);
    const {
        email,
        firstName,
        bvn,
        dateOfBirth,
        gender,
        lastName,
        phoneNumber,
    } = useSelector(signUpInfoSelector);
    const dispatch = useDispatch<AppDispatch>();
    const [disableButton, setDisableButton] = useState(false);



    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<CreateAccountFormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
        resolver: joiResolver(createAccountSchema),
    });
    const { openModalFunc } = useModal("BeginVerificationModal", false);

    useEffect(() => {
        if (email) {
            setValue("emailAddress", email);
        }
        if (firstName) {
            setValue("firstName", firstName);
        }
        if (phoneNumber) {
            setValue("phoneNumber", phoneNumber);
        }
        if (bvn) {
            setValue("bvn", bvn);
        }
        if (dateOfBirth) {
            setValue("dateOfBirth", dateOfBirth);
        }
        if (gender) {
            setValue("gender", gender);
        }
        if (lastName) {
            setValue("lastName", lastName);
        }
    }, [
        firstName,
        phoneNumber,
        email,
        bvn,
        dateOfBirth,
        gender,
        lastName,
        setValue,
    ]);

    useEffect(() => {
        if (!isLoading && isSuccess) {
            openModalFunc();
        }
    }, [isLoading, isSuccess, isError, openModalFunc]);

    console.log(getValues());

    const onSubmit = handleSubmit(async (data) => {
        // disable button on click
        setDisableButton(true);

        // generate email code
        const emailCode = verificationRequests.generateVerificationCode();

        // create loading toaster
        const loading = toast.loading("Sending code to your email...", {
            position: "top-right",
        });

        // send email verification
        const verificationResponse = await verificationRequests
            .verifyEmail({
                fourDigitCode: emailCode,
                toEmail: data.emailAddress,
            })
            .then((res) => {
                dispatch(
                    setSignUpInfo({
                        email: data.emailAddress,
                        firstName: data.firstName,
                        password: data.password,
                        phoneNumber: data.phoneNumber.toString(),
                        bvn: data.bvn,
                        gender: data?.gender!,
                        dateOfBirth: data.dateOfBirth,
                        lastName: data.lastName,
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

    const watchGender = watch("gender");

    return (
        <form
            className=" grid grid-cols-12 py-20 gap-x-0 md:gap-x-10 gap-y-14 md:gap-y-28 text-darkTextColor text-base md:text-xl"
            onSubmit={onSubmit}
            autoSave={"off"}
            autoComplete={"off"}
        >
            {/*enter first name */}
            <div className="col-span-12  md:col-span-6 ">
                <FloatingPlaceholderTextField
                    errorMessage={errors.firstName?.message}
                    placeholder="First Name"
                    registerName="fistName"
                    register={register("firstName")}
                    type="text"
                />
            </div>
            {/*enter last name */}
            <div className="col-span-12  md:col-span-6 ">
                <FloatingPlaceholderTextField
                    errorMessage={errors.lastName?.message}
                    placeholder="Last Name"
                    registerName="lastName"
                    register={register("lastName")}
                    type="text"
                />
            </div>

            {/*enter email */}
            <div className="col-span-12 md:col-span-6">
                <FloatingPlaceholderTextField
                    errorMessage={errors.emailAddress?.message}
                    placeholder="Email Address"
                    registerName="emailAddress"
                    register={register("emailAddress")}
                    type="email"
                />
            </div>

            {/* Gender */}
            <div className="col-span-12 md:col-span-6">
                <Controller
                    name="gender"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <DropDownOptions
                            placeholder="Gender"
                            options={genderDropdownOptions}
                            errorMessage= {errors?.gender?.value.message}
                        />
                    )}
                />
            </div>


            {/*enter phone number */}
            <div className="col-span-12 md:col-span-6 ">
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

            {/*Date Of Birth*/}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor ">
                    <label htmlFor="EditProfileDetails_dateOfBirth"> </label>
                    <input
                        type="text"
                        {...register("dateOfBirth")}
                        id="EditProfileDetails__dateOfBirth"
                        className="outline-none pb-4  w-full cursor-pointer"
                        placeholder="Date of Birth"
                        onFocus={(e) => {
                            e.target.type = "date";
                        }}
                        onBlur={(e) => {
                            e.target.type = "text";
                        }}
                    />
                </div>
                {errors.dateOfBirth && (
                    <p className="text-xs text-red-900 ">
                        {errors.dateOfBirth?.message}
                    </p>
                )}
            </div>

            {/* BVN */}

            <div className="md:col-span-6 col-span-12  ">
                <FloatingPlaceholderTextField
                    errorMessage={errors.bvn?.message}
                    placeholder="BVN"
                    registerName="password"
                    register={register("bvn")}
                    type="text"
                />
            </div>

            {/*enter password */}
            <div className="col-span-12 md:col-span-6">
                <FloatingPlaceholderTextField
                    errorMessage={errors.password?.message}
                    placeholder="Password"
                    registerName="password"
                    register={register("password")}
                    type="password"
                />
            </div>

            {/*confirm password */}
            <div className="col-span-12 md:col-span-6">
                <FloatingPlaceholderTextField
                    errorMessage={errors.confirmPassword?.message}
                    placeholder="Confirm Password"
                    registerName="confirmPassword"
                    register={register("confirmPassword")}
                    type="password"
                />
            </div>

            <div className="col-span-12 space-y-6">
                <button
                    className="btn1 w-full "
                    type="submit"
                    disabled={disableButton}
                >
                    {disableButton ? "Loading..." : "Proceed"}
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
