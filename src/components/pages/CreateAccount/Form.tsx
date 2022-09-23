// react
import { Link } from "react-router-dom";

// react-hook-form
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../services/customHooks/useModal";
import { verificationRequests } from "../../../services/requests/verificationRequests";
import {
    setSignUpInfo,
    setSmsCode,
    signUpInfoSelector,
} from "../../../state/redux/signUpInfoSlice";
import { AppDispatch } from "../../../state/redux/store";
import { CreateAccountFormData } from "../../../typings";
import { paths } from "../../../utils/constants/allPaths";
import { createAccountSchema } from "../../../utils/validation/createAccount";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import PhoneField from "../../shared/Inputs/TextFields/PhoneField";

import SyncDropdown from "../../shared/Dropdowns/SyncDropdown";
import DateInputField from "../../shared/Inputs/TextFields/DateInputField";
import authRequest from "../../../services/requests/authRequest";

function Form() {
    // gender drop down options
    const genderDropdownOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    // variables from sign up selector state
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

    // react hook form variables
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
        setValue,
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

    const doesUserEmailExist = async (email: string): Promise<boolean> => {
        const adminTokenRequest = await authRequest.getAdminToken();

        if (adminTokenRequest.status === 200) {
            const userExistResponse = await authRequest.doesUserExist(
                adminTokenRequest.data.access_token,
                email
            );
            if (
                userExistResponse.status === 200 &&
                userExistResponse.data === true
            ) {
                return true;
            } else if (
                userExistResponse.status === 200 &&
                userExistResponse.data === false
            ) {
                return false;
            } else {
                throw new Error("Error occured while validating your info");
            }
        }
        throw new Error("Error occured while validating your info");
    };

    // open the begin verification modal to prompt users to check phone verification
    const { openModalFunc } = useModal("BeginVerificationModal", false);

    // check if fields are within signupinfo state and populates accordingly (except password and confirm password)
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
            setValue(
                "dateOfBirth",
                dateOfBirth.substring(0, 4) +
                    "-" +
                    dateOfBirth.substring(4, 6) +
                    "-" +
                    dateOfBirth.substring(6)
            );
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

    // useEffect(() => {
    //     if (!isLoading && isSuccess) {
    //         openModalFunc();
    //     }
    // }, [isLoading, isSuccess, isError]);

    const onSubmit = handleSubmit(async (data) => {
        // disable button on click
        setDisableButton(true);
        let doesUserExistVar: boolean;
        try {
            doesUserExistVar = await doesUserEmailExist(data.emailAddress);
            if (doesUserExistVar) {
                toast.error("Email already in use", { position: "top-right" });
                setDisableButton(false);
                return;
            }
        } catch (e: any) {
            e.message && toast.error(e.message, { position: "top-right" });
            setDisableButton(false);
            return;
        }

        // await dispatch(
        //     createUserFull({
        //         firstName: data.firstName.trim(),
        //         lastName: data.lastName.trim(),
        //         bvn: data.bvn.trim(),
        //         dateOfBirth: data.dateOfBirth.trim(),
        //         gender: data.gender?.value?.trim()!,
        //         email: data.emailAddress.trim(),
        //         phoneNumber: data.phoneNumber.trim(),
        //         password: data.password.trim(),
        //     })
        // );

        const phoneCode = verificationRequests.generateVerificationCode();

        // create loading toaster
        const loading = toast.loading("Sending code to your phone number...", {
            position: "top-right",
        });

        if (typeof data.phoneNumber === "string") {
            // send email verification
            await verificationRequests
                .verifySms({
                    fourDigitCode: phoneCode,
                    recipientPhoneNumber: data.phoneNumber.replace("+", ""),
                })
                .then(async (res) => {
                    console.log(res.data);
                    if (res.data.sentOK === true) {
                        dispatch(setSmsCode({ smsCode: phoneCode }));
                        dispatch(
                            setSignUpInfo({
                                email: data.emailAddress,
                                firstName: data.firstName,
                                password: data.password,
                                phoneNumber: data.phoneNumber.toString(),
                                bvn: data.bvn,
                                gender: data?.gender!,
                                dateOfBirth: data.dateOfBirth
                                    .split("T")[0]
                                    .replaceAll("-", ""),
                                lastName: data.lastName,
                            })
                        );
                        toast.success(
                            "Verification code sent to your phone number",
                            {
                                id: loading,
                            }
                        );
                        openModalFunc();
                    } else {
                        toast.error(
                            "Could not send sms. Please check your phone number",
                            { id: loading }
                        );
                    }
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log("hello");
                    console.log(err);
                    toast.error(
                        "Something went wrong while sending verification code. Please try again later",
                        { id: loading }
                    );
                });
        }

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
                        <SyncDropdown
                            placeholder="Gender"
                            onChange={onChange}
                            value={value}
                            options={genderDropdownOptions}
                            errorMessage={errors?.gender?.value?.message}
                        />
                    )}
                />
            </div>

            {/*enter phone number */}
            <div className="col-span-12 md:col-span-6 ">
                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PhoneField
                            placeholder="Phone Number"
                            phoneElementClassName="pb-4 space-x-4 max-h-10"
                            onChange={onChange}
                            value={value}
                            style={{ borderRadius: "0px" }}
                            errorMessage={errors.phoneNumber?.message}
                        />
                    )}
                />
            </div>

            {/*Date Of Birth*/}
            <div className=" col-span-12 md:col-span-6">
                <Controller
                    control={control}
                    name="dateOfBirth"
                    render={({ field: { onChange, value } }) => {
                        return (
                            <DateInputField
                                errorMessage={errors.dateOfBirth?.message}
                                id="dateOfBirth"
                                onChange={onChange}
                                value={value}
                                placeholder="Date of Birth"
                                max={new Date(
                                    new Date().setFullYear(
                                        new Date().getFullYear() - 18
                                    )
                                )
                                    .toISOString()
                                    .substring(0, 10)}
                            />
                        );
                    }}
                />
            </div>

            {/* BVN */}

            <div className="md:col-span-6 col-span-12  ">
                <FloatingPlaceholderTextField
                    errorMessage={errors.bvn?.message}
                    placeholder="BVN"
                    registerName="password"
                    register={register("bvn")}
                    type="text"
                    inputMode="numeric"
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
