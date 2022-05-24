// react
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// react-hook-form
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { numbersNoDecimal } from "../../../utils/constants/inputValidationPatterns";
import { createAccountSchema } from "../../../utils/validation/createAccount";
import PhoneField from "../../shared/TextFields/PhoneField";

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

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateAccountFormData>({
        defaultValues: {
            cscsAccountNumber: "",
            fullName: "",
            emailAddress: "",
            phoneNumber: "",
            bvn: "",
            password: "",
        },
        resolver: joiResolver(createAccountSchema),
    });

    const onSubmit = handleSubmit((data) => {
        navigate("/email-verification");
    });

    return (
        <form
            className=" grid grid-cols-12 py-20 gap-x-0 md:gap-x-10 gap-y-14 md:gap-y-28 text-darkTextColor"
            onSubmit={onSubmit}
            autoSave={"off"}
            autoComplete={"off"}
        >
            <div className="col-span-12  ">
                <div className="border-0 border-b-2  border-underlineColor">
                    <label htmlFor="fullName"></label>
                    <input
                        type="text"
                        {...register("fullName")}
                        id="CreateAccount__fullName"
                        className="outline-none pb-4  border-0 "
                        placeholder="Full Name"
                    />
                </div>
                <p className="text-xs text-red-900 ">
                    {errors.fullName?.message}
                </p>
            </div>
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

            <div className="md:col-span-6 col-span-12 space-y-6">
                <button
                    className="w-full px-5 py-4 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all"
                    type="submit"
                >
                    Proceed
                </button>
                <h6 className="text-center md:text-left">
                    Already have an account?{" "}
                    <span className="text-accentColor">
                        <Link to={"/"}>Sign in</Link>
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
