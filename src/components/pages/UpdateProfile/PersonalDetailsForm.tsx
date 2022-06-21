import React from "react";

// custom components
import Progress from "./Progress";

// form imports
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";

// react-icons
import { AiOutlineCloudUpload } from "react-icons/ai";

// react-router
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PersonalDetailsFormInfo } from "../../../typings";
import { joiResolver } from "@hookform/resolvers/joi";
import { personalDetailsFormSchema } from "../../../utils/validation/personalDetailForm";
import PhoneField from "../../shared/Inputs/TextFields/PhoneField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import {
    authSelector,
    updateUserPersonalDetailsFull,
} from "../../../state/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../state/store";
import { date } from "joi";
import toast from "react-hot-toast";
import { render } from "@testing-library/react";
import FileInput from "../../shared/Inputs/FileInput";

function PersonalDetailsForm() {
    // redux auth state
    const {
        email,
        firstName,
        lastName,
        middleName: otherName,
        phoneNumber,
        gender,
        dateOfBirth,
        bvn,
        maritalStatus,
        title,
        residentialAddress,
        cscsNumber
    } = useSelector(authSelector).user!;

    const { isError, isLoading, isSuccess, errorMessage } =
        useSelector(authSelector);

    // react redux variables
    const dispatch = useDispatch<AppDispatch>();

    // Gender options
    const genderDropdownOptions = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    // marital status options
    const maritalStatusDropdownOptions = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorce", label: "Divorce" },
        { value: "Widow", label: "Widow" },
        { value: "Remarried", label: "Remarried" },
    ];

    // raact-router variables
    const navigate = useNavigate();

    // loading button control
    const [isButtonLoading, setButtonLoading] = useState(false);

    // toast Id
    const toastId = "updateProfile";

    const {
        register,
        control,
        watch,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<PersonalDetailsFormInfo>({
        resolver: joiResolver(personalDetailsFormSchema),
        mode: "onChange",
    });

    const onSubmitForm = handleSubmit(async (data) => {
        setButtonLoading(true);
        await dispatch(
            updateUserPersonalDetailsFull({
                firstName: data.firstName,
                lastName: data.lastName,
                title: data.title,
                phoneNumber: data.phoneNumber,
                email: data.emailAddress,
                bvn: data.bvn,
                maritalStatus: data.maritalStatus.value,
                gender: data.gender.value,
                middleName: data.middleName,
                dateOfBirth: data.dateOfBirth.split("T")[0],
                cscsNumber: data.cscsNumber,
                residentialAddress: data.residentialAddress,
                picture: data.picture,
            })
        );
        // navigate("/update-profile/employment-details");

        setButtonLoading(false);
    });

    // 
    // watch variables from react-hook-form
    const watchPictureUpload = watch("picture");
    const watchGender = watch("gender");
    const watchMaritalStatus = watch("maritalStatus");
    const watchproofOfIdentification = watch("proofOfIdentification");
    const watchproofOfResidence = watch("proofOfResidence");
    const watchSalarySlips = watch("salarySlips");

    console.log(getValues());

    useEffect(() => {
        if (email) {
            setValue("emailAddress", email);
        }
        if (phoneNumber) {
            setValue("phoneNumber", phoneNumber);
        }
        if (otherName) {
            setValue("middleName", otherName);
        }
        if (firstName) {
            setValue("firstName", firstName);
        }
        if (lastName) {
            setValue("lastName", lastName);
        }
        if (gender) {
            if (gender.toLowerCase() === "m") {
                setValue("gender", { label: "Male", value: "M" });
            }
            if (gender.toLowerCase() === "f") {
                setValue("gender", { label: "Female", value: "F" });
            }
        }
        if (dateOfBirth) {
            setValue("dateOfBirth", "2000-08-23");
        }
        if (bvn) {
            setValue("bvn", bvn);
        }
        if (maritalStatus) {
            const currentMaritalStatus = maritalStatusDropdownOptions.filter(
                (option) => option.value === maritalStatus
            );
            if (currentMaritalStatus.length === 0) return;
            setValue("maritalStatus", currentMaritalStatus[0]);
        }
        if (title) {
            setValue("title", title);
        }
        if (residentialAddress) {
            setValue("residentialAddress", residentialAddress);
        }
        if(cscsNumber){
            setValue("cscsNumber", cscsNumber)
        }

    }, [email, phoneNumber, name, gender, otherName, dateOfBirth, bvn, title]); // eslint-disable-line

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
                    <FloatingPlaceholderTextField
                        placeholder="Title"
                        type="text"
                        register={register("title")}
                        registerName="title"
                        id="UpdateProfileDetails__title"
                        errorMessage={errors.title?.message}
                    />
                </div>
                {/* Full Name */}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="First Name"
                        type="text"
                        register={register("firstName")}
                        registerName="firstName"
                        id="UpdateProfileDetails__firstName"
                        errorMessage={errors.firstName?.message}
                    />
                </div>
                {/* Full Name */}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Last Name"
                        type="text"
                        register={register("lastName")}
                        registerName="lastName"
                        id="UpdateProfileDetails__lastName"
                        errorMessage={errors.lastName?.message}
                    />
                </div>
                {/* Full Name */}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Middle Name"
                        type="text"
                        register={register("middleName")}
                        registerName="middleName"
                        id="UpdateProfileDetails__middleName"
                        errorMessage={errors.middleName?.message}
                    />
                </div>

                {/* Email Address */}
                <div className=" col-span-12 md:col-span-6">
                    <FloatingPlaceholderTextField
                        placeholder="Email Address"
                        type="text"
                        register={register("emailAddress")}
                        registerName="emailAddress"
                        readOnly={true}
                        id="UpdateProfileDetails__emailAddress"
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
                                        readOnly={true}
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
                            {errors?.gender?.message}
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
                                    menuClassName="absolute  left-0 top-16 w-full bg-gray-100 max-h-36 rounded-md scrollbar scrollbar-visible space-y-2 overflow-y-scroll p-3 z-10"
                                />
                            )}
                        />

                        <label htmlFor="tenor"></label>
                    </div>

                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.maritalStatus?.message}
                        </p>
                    }
                </div>

                {/* CSCS Number */}
                <div className=" col-span-12 ">
                    <FloatingPlaceholderTextField
                        placeholder="CSCS Number"
                        type="text"
                        register={register("cscsNumber")}
                        registerName="cscsNumber"
                        id="UpdateProfileDetails__cscsNumber"
                        errorMessage={errors.cscsNumber?.message}
                    />
                </div>

                {/*bvn*/}
                <div className=" col-span-12 ">
                    <FloatingPlaceholderTextField
                        placeholder="BVN"
                        type="text"
                        register={register("bvn")}
                        registerName="BVN"
                        id="UpdateProfileDetails__bvn"
                        errorMessage={errors.bvn?.message}
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
                    <Controller
                        control={control}
                        name="picture"
                        render={({ field: { onChange, value } }) => (
                            <FileInput
                                id="picture"
                                onChange={onChange}
                                value={value}
                                errorMessage={errors.picture?.message}
                                placeholder={"Upload Picture"}
                            />
                        )}
                    />
                </div>

                <div className="col-span-12">
                    <Controller
                        control={control}
                        name="proofOfIdentification"
                        render={({ field: { onChange, value } }) => (
                            <FileInput
                                id="proofOfIdentification"
                                onChange={onChange}
                                value={value}
                                errorMessage={
                                    errors.proofOfIdentification?.message
                                }
                                placeholder={"Proof of Identification"}
                            />
                        )}
                    />
                </div>

                <div className="col-span-12">
                    <Controller
                        control={control}
                        name="proofOfResidence"
                        render={({ field: { onChange, value } }) => (
                            <FileInput
                                id="proofOfResidence"
                                onChange={onChange}
                                value={value}
                                errorMessage={errors.proofOfResidence?.message}
                                placeholder={"Proof of Residence"}
                            />
                        )}
                    />
                </div>

                <div className="col-span-12">
                    <Controller
                        control={control}
                        name="salarySlips"
                        render={({ field: { onChange, value } }) => (
                            <FileInput
                                id="salarySlips"
                                onChange={onChange}
                                value={value}
                                errorMessage={errors.salarySlips?.message}
                                placeholder={
                                    "Original/certified copy of the latest salary slips for the past 3 months"
                                }
                            />
                        )}
                    />
                </div>

                <div className="col-span-12">
                    <button
                        className={`btn1  float-right w-full md:w-48`}
                        type="submit"
                        disabled={isButtonLoading}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetailsForm;
