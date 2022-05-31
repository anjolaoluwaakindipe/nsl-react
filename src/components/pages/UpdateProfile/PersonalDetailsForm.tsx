import React from "react";

// custom components
import Progress from "./Progress";

// form imports
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

// react-icons
import { AiOutlineCloudUpload } from "react-icons/ai";

// react-router
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PersonalDetailsFormInfo } from "../../../typings";
import { joiResolver } from "@hookform/resolvers/joi";
import { personalDetailsFormSchema } from "../../../utils/validation/personalDetailForm";

function PersonalDetailsForm() {
    const genderDropdownOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
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
                {/* Full Name */}
                <div className=" col-span-12 md:col-span-6 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__fullName"></label>
                        <input
                            {...register("fullname")}
                            type="text"
                            pattern={"[0-9]*"}
                            formNoValidate={true}
                            id="UpdateProfile__fullname"
                            className="outline-none pb-4  w-full"
                            placeholder="Full Name"
                        />
                    </div>
                    {errors.fullname && (
                        <p className="text-xs text-red-900 ">
                            {errors.fullname?.message}
                        </p>
                    )}
                </div>

                {/* Email Address */}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__emailAddress"></label>
                        <input
                            type="text"
                            {...register("emailAddress")}
                            max={10}
                            id="UpdateProfile__emailAddress"
                            className="outline-none pb-4  w-full"
                            placeholder="Email Address"
                        />
                    </div>
                    {errors.emailAddress && (
                        <p className="text-xs text-red-900 ">
                            {errors.emailAddress?.message}
                        </p>
                    )}
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
                                <PhoneInput
                                    className="pb-4 space-x-4 max-h-10"
                                    onChange={onChange}
                                    value={value}
                                    style={{ borderRadius: "0px" }}
                                />
                            )}
                        />
                    </div>
                    <p className="text-xs text-red-900 ">
                        {errors.phoneNumber?.message}
                    </p>
                </div>

                {/* Gender */}
                <div className="col-span-12 md:col-span-6">
                    <div className=" border-0 border-b-2  border-underlineColor   ">
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    options={genderDropdownOptions}
                                    onChange={onChange}
                                    arrowClosed={<IoMdArrowDropdown />}
                                    arrowOpen={<IoMdArrowDropup />}
                                    value={value}
                                    placeholder="Gender"
                                    className="relative"
                                    placeholderClassName={
                                        watchGender
                                            ? "text-black"
                                            : "text-gray-400"
                                    }
                                    controlClassName="appearance-none text-gray-400 outline-none border-0 pb-4  m-0 cursor-pointer flex justify-between items-end"
                                    menuClassName="absolute  left-0 top-16 w-full bg-gray-100 max-h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3"
                                />
                            )}
                        />

                        <label htmlFor="gender"></label>
                    </div>

                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.gender?.value?.message}
                        </p>
                    }
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

                {/* Marital Status */}
                <div className="col-span-12 md:col-span-6">
                    <div className=" border-0 border-b-2  border-underlineColor   ">
                        <Controller
                            name="maritalStatus"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    options={maritalStatusDropdownOptions}
                                    onChange={onChange}
                                    arrowClosed={<IoMdArrowDropdown />}
                                    arrowOpen={<IoMdArrowDropup />}
                                    value={value}
                                    placeholder="Marital Status"
                                    className="relative"
                                    placeholderClassName={
                                        watchMaritalStatus
                                            ? "text-black"
                                            : "text-gray-400"
                                    }
                                    controlClassName="appearance-none text-gray-400 outline-none border-0 pb-4  m-0 cursor-pointer flex justify-between items-end"
                                    menuClassName="absolute  left-0 top-16 w-full bg-gray-100 max-h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3"
                                />
                            )}
                        />

                        <label htmlFor="tenor"></label>
                    </div>

                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.gender?.value?.message}
                        </p>
                    }
                </div>

                {/* CSCS Number */}
                <div className=" col-span-12 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__cscsNumber"></label>
                        <input
                            {...register("cscsNumber")}
                            type="text"
                            formNoValidate={true}
                            id="UpdateProfile__cscsNumber"
                            className="outline-none pb-4  w-full"
                            placeholder="CSCS Number"
                        />
                    </div>
                    {errors.cscsNumber && (
                        <p className="text-xs text-red-900 ">
                            {errors.cscsNumber?.message}
                        </p>
                    )}
                </div>

                {/* Residential Area */}
                <div className="col-span-12">
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="UpdateProfile_residentialAddress"></label>
                        <textarea
                            {...register("residentialAddress")}
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
                                ? watchPictureUpload.item(0)?.name
                                : "Upload Picture"}
                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("picture")}
                            id="UpdateProfile__picture"
                            className="outline-none pb-4 hidden"
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
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
                                ? watchproofOfIdentification.item(0)?.name
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
                                ? watchproofOfResidence.item(0)?.name
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
                                ? watchSalarySlips.item(0)?.name
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
