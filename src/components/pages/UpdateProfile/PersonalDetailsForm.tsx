import React from "react";

// custom components
import Progress from "./Progress";
import FloatingPlaceholderTextField from "../../shared/TextFields/FloatingPlaceholderTextField";

// form imports
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

// react-icons
import { AiOutlineCloudUpload } from "react-icons/ai";

// react-router
import { useNavigate } from "react-router-dom";
import { PersonalDetailsFormInfo } from "../../../typings";
import { joiResolver } from "@hookform/resolvers/joi";
import { personalDetailsFormSchema } from "../../../utils/validation/personalDetailForm";
import PhoneField from "../../shared/TextFields/PhoneField";

import DropDownOptions from "../../shared/Dropdowns/DropDownOptions";

function PersonalDetailsForm() {

    const genderDropdownOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    const maritalStatusDropdownOptions = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorce", label: "Divorce" },
        { value: "Widow", label: "Widow" },
        { value: "Remarried", label: "Remarried" },
    ];

    const navigate = useNavigate();

    const {
        register,
        control,
        watch,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<PersonalDetailsFormInfo>({
        resolver: joiResolver(personalDetailsFormSchema),
    });

    const onSubmitForm = handleSubmit((data) => {
        navigate("/update-profile/employment-details");
    });

    const watchPictureUpload = watch("picture");
    const watchGender = watch("gender");
    const watchMaritalStatus = watch("maritalStatus");
    const watchproofOfIdentification = watch("proofOfIdentification");
    const watchproofOfResidence = watch("proofOfResidence");
    const watchSalarySlips = watch("salarySlips");

    console.log(errors);
    console.log(getValues());

    return (
        <div>
            <div className="flex justify-between items-center pt-10 pb-5 border-b-2 border-gray-200">
                <h4 className="text-accentColor ">Personal Details</h4>
                <Progress />
            </div>

            <form
                onSubmit={onSubmitForm}
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoComplete="off"
                autoSave="off"
            >

                {/*firstname */}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="FirstName"
                        type="text"
                        register={register("fullname")}
                        registerName='FirstName'
                        id="UpdateProfile__FirstName"
                        errorMessage={errors.fullname?.message}
                    />
                </div>

                {/*Lastname */}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="LastName"
                        type="text"
                        register={register("fullname")}
                        registerName='FirstName'
                        id="UpdateProfile__LastName"
                        errorMessage={errors.fullname?.message}
                    />
                </div>



                {/*email address */}
                <div className=" col-span-12 md:col-span-6">
                    <FloatingPlaceholderTextField
                        placeholder="Email Address"
                        type="text"
                        id="UpdateProfile__emailAddress"
                        register={register("emailAddress")}
                        registerName='Email Address'
                        errorMessage={errors.emailAddress?.message}
                    />
                </div>

                {/* Phone Number */}
                <div className="md:col-span-6 col-span-12 ">
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

                {/* Gender */}
                <div className="col-span-12 md:col-span-6">
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DropDownOptions
                                placeholder="Gender"
                                options={genderDropdownOptions}
                                errorMessage={errors?.gender?.value.message}
                            />
                        )}
                    />
                </div>

                {/* Date of Birth */}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor ">
                        <label htmlFor="UpdateProfile_dateOfBirth"> </label>
                        <input
                            type="text"
                            {...register("dateOfBirth")}
                            id="UpdateProfile__dateOfBirth"
                            className="outline-none pb-4  w-full cursor-pointer"
                            placeholder="Date of Birth"
                            onFocus={(e) => {
                                e.target.type = "date";
                            }}
                            onBlur={(e) => {
                                e.target.type = "";
                            }}
                        />
                    </div>
                    {errors.dateOfBirth && (
                        <p className="text-xs text-red-900 ">
                            {errors.dateOfBirth?.message}
                        </p>
                    )}
                </div>

                {/*Marital Status*/}
                <div className="col-span-12 md:col-span-6">
                    <Controller
                        name="maritalStatus"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DropDownOptions
                                placeholder="Marital Status"
                                options={maritalStatusDropdownOptions}
                                errorMessage={errors?.maritalStatus?.value.message}
                            />
                        )}
                    />
                </div>

                {/*CSCS account number*/}
                <div className=" col-span-12 ">
                    <FloatingPlaceholderTextField
                        placeholder="CSCS Number"
                        type="text"
                        register={register("cscsNumber")}
                        registerName='CSCS Number'
                        id="UpdateProfile__cscsNumber"
                        errorMessage={errors.cscsNumber?.message}
                    />
                </div>

                {/* Residential Area */}
                <div className="col-span-12">
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="UpdateProfile_residentialAddress"></label>
                        <textarea
                            {...register("residentialAddress", {
                                validate: (value) =>
                                    value.length > 30 || "Make it more",
                            })}
                            id="UpdateProfile_narration"
                            className="outline-none bg-bgColor pb-4  resize-none h-32 p-3 w-full border-0 "
                            placeholder="Residential Address"
                        ></textarea>
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.residentialAddress?.message}
                        </p>
                    }
                </div>

                {/* Profile Picture */}
                <div className="col-span-12">
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="UpdateProfile__picture"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchPictureUpload &&
                                watchPictureUpload?.length > 0
                                ? "Upload Picture (" +
                                watchPictureUpload.item(0)?.name +
                                ")"
                                : "Upload Picture"}
                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("picture", {
                                validate: (value) => 5 < 3 || "hello",
                            })}
                            id="UpdateProfile__picture"
                            className="outline-none pb-4 hidden"
                            accept=".jpg,.png"
                        />
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors.picture?.message}
                        </p>
                    }
                </div>

                <div className="col-span-12">
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="LoanApplication__proofOfIdentification"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchproofOfIdentification &&
                                watchproofOfIdentification?.length > 0
                                ? "Proof of Identification (" +
                                watchproofOfIdentification.item(0)?.name +
                                ")"
                                : "Proof of Identification"}

                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("proofOfIdentification")}
                            id="LoanApplication__proofOfIdentification"
                            className="outline-none pb-4 hidden"
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>
                <div className="col-span-12">
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="LoanApplication__proofOfResidence"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchproofOfResidence &&
                                watchproofOfResidence?.length > 0
                                ? "Proof of Residence (" +
                                watchproofOfResidence.item(0)?.name +
                                ")"
                                : "Proof of Residence"}

                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("proofOfResidence")}
                            id="LoanApplication__proofOfResidence"
                            className="outline-none pb-4 hidden"
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>
                <div className="col-span-12">
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="LoanApplication__salarySlips"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchSalarySlips && watchSalarySlips?.length > 0
                                ? "Original/certified copy of the latest salary slips for the past 3 months (" +
                                watchSalarySlips.item(0)?.name +
                                ")"
                                : "Original/certified copy of the latest salary slips for the past 3 months"}

                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("salarySlips")}
                            id="LoanApplication__salarySlips"
                            className="outline-none pb-4 hidden"
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>

                <div className="col-span-12">
                    <button
                        className={`btn1  float-right w-full md:w-48`}
                        type="submit"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetailsForm;
