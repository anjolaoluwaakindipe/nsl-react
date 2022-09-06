import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    authSelector,
    updateUserPersonalDetailsFull,
} from "../../../state/redux/authSlice";
import { AppDispatch } from "../../../state/redux/store";
import { paths } from "../../../utils/constants/allPaths";

import SyncDropdown from "../../shared/Dropdowns/SyncDropdown";
import DateInputField from "../../shared/Inputs/TextFields/DateInputField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import PhoneField from "../../shared/Inputs/TextFields/PhoneField";
import { editPersonalDetailsFormSchema } from "../../../utils/validation/editProfile";
import { EditPersonalDetailsInfo } from "../../../typings";

function EditPersonalDetailsForm() {
    // redux authState
    const {
        email,
        firstName,
        lastName,
        middleName,
        phoneNumber,
        gender,
        dateOfBirth,
        bvn,
        maritalStatus,
        title,
        residentialAddress,
        cscsNumber,
        identificationDocExpiryDate,
        identificationDocRef,
        identificationDocType,
        identificationDocumentImage,
        identificationIssueDate,
        proofOfAddressImage,
        picture,
    } = useSelector(authSelector).user!;

    // raact-router variables
    const navigate = useNavigate();

    // button state
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [canBeUpdated, setCanBeUpdated] = useState(false);

    // react redux variables
    const dispatch = useDispatch<AppDispatch>();

    // gender options
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

    // react-hook-form
    const {
        register,
        control,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EditPersonalDetailsInfo>({
        resolver: joiResolver(editPersonalDetailsFormSchema),
    });

    const watchEmail = watch("emailAddress");
    const watchPhoneNumber = watch("phoneNumber");
    const watchMiddleName = watch("middleName");
    const watchFirstName = watch("firstName");
    const watchLastName = watch("lastName");
    const wathcGender = watch("gender");
    const watchDateOfBirth = watch("dateOfBirth");
    const watchBvn = watch("bvn");
    const watchMaritalStatus = watch("maritalStatus");
    const watchTitle = watch("title");
    const watchResidentialAddress = watch("residentialAddress");
    const watchCscsNumber = watch("cscsNumber");

    // update input fields with information from server
    useEffect(() => {
        if (email) {
            setValue("emailAddress", email);
        }
        if (phoneNumber) {
            setValue("phoneNumber", phoneNumber);
        }
        if (middleName) {
            setValue("middleName", middleName);
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
            setValue("dateOfBirth", dateOfBirth);
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
        if (cscsNumber) {
            setValue("cscsNumber", cscsNumber);
        }
    }, [
        email,
        phoneNumber,
        firstName,
        lastName,
        gender,
        middleName,
        dateOfBirth,
        bvn,
        title,
        maritalStatus,
        residentialAddress,
        cscsNumber,
        setValue,
    ]); // eslint-disable-line

    useEffect(() => {
        if (
            email === watchEmail &&
            phoneNumber === watchPhoneNumber &&
            firstName === watchFirstName &&
            lastName === watchLastName &&
            gender === wathcGender.value &&
            middleName === watchMiddleName &&
            (dateOfBirth === watchDateOfBirth ||
                dateOfBirth === watchDateOfBirth.split("T")[0]) &&
            bvn === watchBvn &&
            title === watchTitle &&
            maritalStatus === watchMaritalStatus.value &&
            residentialAddress === watchResidentialAddress &&
            cscsNumber === watchCscsNumber
        ) {
            setCanBeUpdated(false);
        } else {
            setCanBeUpdated(true);
        }
    }, [
        email,
        phoneNumber,
        firstName,
        lastName,
        gender,
        middleName,
        dateOfBirth,
        bvn,
        title,
        maritalStatus,
        residentialAddress,
        cscsNumber,
        watchEmail,
        watchPhoneNumber,
        watchFirstName,
        watchLastName,
        wathcGender,
        watchMiddleName,
        watchDateOfBirth,
        watchBvn,
        watchTitle,
        watchMaritalStatus,
        watchResidentialAddress,
        watchCscsNumber,
    ]);

    const onSubmitForm = handleSubmit(async (data) => {
        setButtonLoading(true);
        console.log(data);
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
                dateOfBirth: data.dateOfBirth.includes("T")
                    ? data.dateOfBirth.split("T")[0]
                    : data.dateOfBirth,
                cscsNumber: data.cscsNumber,
                residentialAddress: data.residentialAddress,
                identificationDocExpiryDate,
                identificationDocRef,
                identificationDocType,
                identificationDocumentImage,
                identificationIssueDate,
                proofOfAddressImage,
                picture,
                inputStatus: "Draft",
                cb: navigateToSubmissionSummary,
            })
        );
        // navigate("/update-profile/employment-details");

        setButtonLoading(false);
    });

    const navigateToSubmissionSummary = () => {
        navigate(paths.SUMMARY, { replace: true });
    };

    return (
        <form
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            autoSave="off"
            autoComplete="off"
            onSubmit={onSubmitForm}
        >
            {/*Title */}
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

            {/* Last Name */}

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

            {/* Middle name */}
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
                                errorMessage={errors.phoneNumber?.message}
                            />
                        </div>
                    )}
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
                            value={value}
                            onChange={onChange}
                            options={genderDropdownOptions}
                            errorMessage={errors?.gender?.value?.message}
                        />
                    )}
                />
            </div>

            {/* Date of Birth */}
            <div className=" col-span-12 md:col-span-6">
                <Controller
                    control={control}
                    name="dateOfBirth"
                    render={({ field: { onChange, value } }) => {
                        return (
                            <DateInputField
                                register={register("dateOfBirth")}
                                value={value}
                                onChange={onChange}
                                errorMessage={errors.dateOfBirth?.message}
                                placeholder="Date of Birth"
                                id="dateOfBirth"
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

            {/*Marital Status*/}
            <div className="col-span-12 md:col-span-6">
                <Controller
                    name="maritalStatus"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <SyncDropdown
                            placeholder="Marital Status"
                            options={maritalStatusDropdownOptions}
                            onChange={onChange}
                            value={value}
                            errorMessage={errors?.maritalStatus?.value?.message}
                        />
                    )}
                />
            </div>

            {/*CSCS account number*/}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="CSCS Number"
                    type="text"
                    register={register("cscsNumber")}
                    registerName="CSCS Number"
                    id="UpdateProfile__cscsNumber"
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
                        className="outline-none bg-bgColor pb-4  resize-none h-25 p-3 w-full border-0 "
                        placeholder="Residential Address"
                    ></textarea>
                </div>
                {
                    <p className="text-xs text-red-900 ">
                        {errors?.residentialAddress?.message}
                    </p>
                }
            </div>
            {/*save button */}
            <div className="col-span-12">
                <button
                    className={`btn1  float-right w-full md:w-48`}
                    type="submit"
                    disabled={isButtonLoading || !canBeUpdated}
                >
                    {isButtonLoading ? "Loading..." : "Save"}
                </button>
            </div>
        </form>
    );
}

export default EditPersonalDetailsForm;
