// custom components
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import Progress from "./Progress";

// form imports
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

// react-icons
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    authSelector,
    updateUserPersonalDetailsFull,
} from "../../../state/redux/authSlice";
import { AppDispatch } from "../../../state/redux/store";
import { PersonalDetailsFormInfo } from "../../../typings";
import { paths } from "../../../utils/constants/allPaths";
import { updatePersonalDetailsFormSchema } from "../../../utils/validation/updateProfile";
import SyncDropdown from "../../shared/Dropdowns/SyncDropdown";
import FileInput from "../../shared/Inputs/FileInput";
import DateInputField from "../../shared/Inputs/TextFields/DateInputField";
import PhoneField from "../../shared/Inputs/TextFields/PhoneField";
import { AiOutlineClose } from "react-icons/ai";
import WebCamInput from "../../shared/Inputs/WebCamInput";

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
        cscsNumber,
        picture,
        identificationDocumentImage,
        proofOfAddressImage,
        identificationDocExpiryDate,
        identificationDocRef,
        identificationDocType,
        identificationIssueDate,
    } = useSelector(authSelector).user!;

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

    //document type options
    const documentTypeDropdownOptions = [
        { value: "Drivers License", label: "Drivers License" },
        { value: "Passport", label: "Passport" },
        { value: "library card", label: "Library Card" },
        { value: "schoolid", label: "School ID" },
    ];

    // raact-router variables
    const navigate = useNavigate();

    // loading button control
    const [isButtonLoading, setButtonLoading] = useState(false);

    const navigateToUpdateEmploymentDetail = () => {
        navigate(
            paths.UPDATE_PROFILE.base + paths.UPDATE_PROFILE.EMPLOYMENT_DETAILS
        );
    };

    const {
        register,
        control,
        watch,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<PersonalDetailsFormInfo>({
        resolver: joiResolver(updatePersonalDetailsFormSchema),
        mode: "onChange",
    });

    console.log(errors);

    // submit personal details for update
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
                picture: data.picture,
                identificationDocumentImage: data.proofOfIdentification,
                identificationDocExpiryDate: data.IdexpiryDate.includes("T")
                    ? data.IdexpiryDate.split("T")[0]
                    : data.IdexpiryDate,
                identificationDocRef: data.documentRefNumber,
                identificationIssueDate: data.IdissueDate.includes("T")
                    ? data.IdissueDate.split("T")[0]
                    : data.IdissueDate,
                identificationDocType: data.documentType.value,
                proofOfAddressImage: data.proofOfResidence,
                cb: navigateToUpdateEmploymentDetail,
                inputStatus: "Draft",
            })
        );
        // navigate("/update-profile/employment-details");

        setButtonLoading(false);
    });

    console.log(getValues());

    const FileImages = ({ base64 }: { base64: string }) => {
        const [showFullImage, setShowFullImage] = useState(false);
        return (
            <>
                {showFullImage && (
                    <div
                        className="fixed top-0 left-0 w-full h-screen p-5 md:p-20 bg-gray-900 bg-opacity-80   flex justify-center items-center"
                        onClick={() => setShowFullImage(false)}
                    >
                        <AiOutlineClose
                            className="text-2xl text-white absolute top-10 right-10 cursor-pointer"
                            onClick={() => setShowFullImage(false)}
                        />
                        <img
                            src={"data:image/jpg;base64," + base64}
                            alt="your_image"
                            className="object-contain w-full md:w-auto  object-top h-3/4"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    </div>
                )}
                <div className="col-span-12">
                    <div
                        className="w-full bg-gray-400 flex h-60 justify-center cursor-pointer overflow-hidden"
                        onClick={() => setShowFullImage(true)}
                    >
                        <img
                            src={"data:image/png;base64," + base64}
                            alt="your_image"
                            className="object-cover w-full object-top"
                        />
                    </div>
                </div>
            </>
        );
    };

    const displayImage = (preferredImage: string, placeholderImage: string) => {
        if (!preferredImage && !placeholderImage) return;

        if (preferredImage || placeholderImage) {
            if (preferredImage) {
                return <FileImages base64={preferredImage} />;
            }

            return <FileImages base64={placeholderImage} />;
        }
    };

    // update fields with user information
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
            setValue("dateOfBirth", dateOfBirth.split("T")[0]);
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
        if (picture) {
            setValue("picture", picture);
        }
        if (identificationDocumentImage) {
            setValue("proofOfIdentification", identificationDocumentImage);
        }
        if (proofOfAddressImage) {
            setValue("proofOfResidence", proofOfAddressImage);
        }
        if (
            identificationDocExpiryDate &&
            identificationDocExpiryDate !== null
        ) {
            setValue("IdexpiryDate", identificationDocExpiryDate.split("T")[0]);
        }
        if (identificationDocRef) {
            setValue("documentRefNumber", identificationDocRef);
        }
        if (identificationDocType) {
            const currentOption = documentTypeDropdownOptions.filter(
                (option) => option.value === identificationDocType
            );
            if (currentOption.length === 0) return;
            setValue("documentType", currentOption[0]);
        }
        if (identificationIssueDate && !identificationIssueDate !== null) {
            setValue("IdissueDate", identificationIssueDate.split("T")[0]);
        }
    }, [
        email,
        phoneNumber,
        firstName,
        lastName,
        gender,
        otherName,
        dateOfBirth,
        bvn,
        title,
        identificationDocumentImage,
        maritalStatus,
        residentialAddress,
        cscsNumber,
        picture,
        proofOfAddressImage,
        setValue,
        identificationDocExpiryDate,
        identificationDocRef,
        identificationDocType,
        identificationIssueDate,
    ]); // eslint-disable-line

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

                {/* Middle Name */}

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
                                errorMessage={errors?.gender?.message}
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
                                errorMessage={errors?.maritalStatus?.message}
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

                <div className="text-lg text-red-900 col-span-12 md:w-full">
                    Proof of Identification
                </div>

                {/* Document Type */}
                <div className="col-span-12 md:col-span-6">
                    <Controller
                        name="documentType"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <SyncDropdown
                                placeholder="Document Type"
                                options={documentTypeDropdownOptions}
                                onChange={onChange}
                                value={value}
                                errorMessage={errors?.documentType?.message}
                            />
                        )}
                    />
                </div>

                {/*Document reference number*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Document Reference Number"
                        type="text"
                        register={register("documentRefNumber")}
                        id="UpdateProfile__documentRefNumber"
                        errorMessage={errors.documentRefNumber?.message}
                    />
                </div>

                {/* expiry Date  */}
                <div className=" col-span-12 md:col-span-6">
                    <Controller
                        control={control}
                        name="IdexpiryDate"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DateInputField
                                    onChange={onChange}
                                    value={value}
                                    register={register("IdexpiryDate")}
                                    placeholder="Expiry Date"
                                    id="IdexpiryDate"
                                    errorMessage={errors.IdexpiryDate?.message}
                                    min={new Date()
                                        .toISOString()
                                        .substring(0, 10)}
                                />
                            );
                        }}
                    />
                </div>

                {/* issue Date  */}
                <div className=" col-span-12 md:col-span-6">
                    <Controller
                        control={control}
                        name="IdissueDate"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <DateInputField
                                    onChange={onChange}
                                    value={value}
                                    register={register("IdissueDate")}
                                    placeholder="Issue Date"
                                    id="IdissueDate"
                                    errorMessage={errors.IdissueDate?.message}
                                    max={new Date()
                                        .toISOString()
                                        .substring(0, 10)}
                                />
                            );
                        }}
                    />
                </div>

                {/* Proof of Identification with image */}
                {displayImage(
                    watch("proofOfIdentification")!,
                    identificationDocumentImage!
                )}

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

                <div className="col-span-12" />

                {/* Profile Picture */}
                {/* <div className="col-span-12">
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
                </div> */}

                {/* {displayImage(watch("picture")!, picture!)} */}

                {/* Proof of residence and image */}
                {displayImage(watch("proofOfResidence")!, proofOfAddressImage!)}

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

                {/* WebCam image */}
                <div className="col-span-12">
                    <Controller
                        control={control}
                        name="picture"
                        render={({ field: { onChange, value } }) => (
                            <WebCamInput
                                value={value}
                                onChange={onChange}
                                errorMessage={errors.picture?.message}
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
