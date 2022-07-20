import React from "react";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { EditUploadsInfo } from "../../../typings";
import { joiResolver } from "@hookform/resolvers/joi";
import {
    editPersonalDetailsFormSchema,
    editUploadsDetailsFormSchema,
} from "../../../utils/validation/editProfile";
import FileInput from "../../shared/Inputs/FileInput";
import DateInputField from "../../shared/Inputs/TextFields/DateInputField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import DropDownOptions from "../../shared/Dropdowns/DropDownOptions";
import { useSelector, useDispatch } from "react-redux";
import {
    authSelector,
    updateUserPersonalDetailsFull,
} from "../../../state/authSlice";
import { AppDispatch } from "../../../state/store";
import { paths } from "../../../utils/constants/allPaths";
import { useNavigate } from "react-router-dom";

function Form() {
    // redux auth state
    const {
        picture,
        identificationDocumentImage,
        proofOfAddressImage,
        identificationDocExpiryDate,
        identificationDocRef,
        identificationDocType,
        identificationIssueDate,
    } = useSelector(authSelector).user!;

    // loading button control
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [canBeUpdated, setCanBeUpdated] = useState(false);

    //document type options
    const documentTypeDropdownOptions = [
        { value: "Drivers License", label: "Drivers License" },
        { value: "Passport", label: "Passport" },
        { value: "library card", label: "Library Card" },
        { value: "schoolid", label: "School ID" },
    ];

    // react redux variables
    const dispatch = useDispatch<AppDispatch>();

    // raact-router variables
    const navigate = useNavigate();

    const {
        register,
        control,
        watch,
        handleSubmit,
        setValue,

        formState: { errors },
    } = useForm<EditUploadsInfo>({
        resolver: joiResolver(editUploadsDetailsFormSchema),
        mode: "onChange",
    });

    const watchPictureUpload = watch("picture");
    const watchproofOfIdentification = watch("proofOfIdentification");
    const watchproofOfResidence = watch("proofOfResidence");
    const watchIdexpiryDate = watch("IdexpiryDate");
    const watchIdissueDate = watch("IdissueDate");
    const watchDocumentRefNumber = watch("documentRefNumber");
    const watchDocumentType = watch("documentType");

    // update fields with user information
    useEffect(() => {
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
        picture,
        proofOfAddressImage,
        setValue,
        identificationDocExpiryDate,
        identificationDocRef,
        identificationDocType,
        identificationIssueDate,
        identificationDocumentImage,
    ]); // eslint-disable-line

    const onSubmitForm = handleSubmit(async (data) => {
        setButtonLoading(true);
        console.log(data);
        await dispatch(
            updateUserPersonalDetailsFull({
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
                inputStatus: "Draft",
                cb: navigateToSummary,
            })
        );
        // navigate("/update-profile/employment-details");

        setButtonLoading(false);
    });

    useEffect(() => {
        if (
            picture === watchPictureUpload &&
            identificationDocumentImage === watchproofOfIdentification &&
            proofOfAddressImage === watchproofOfResidence &&
            identificationDocRef === watchDocumentRefNumber &&
            identificationDocType === watchDocumentType?.value! &&
            (identificationIssueDate === watchIdissueDate ||
                identificationIssueDate === watchIdissueDate.split("T")[0]) &&
            (identificationDocExpiryDate === watchIdexpiryDate ||
                identificationDocExpiryDate === watchIdexpiryDate.split("T")[0])
        ) {
            setCanBeUpdated(false);
        } else {
            setCanBeUpdated(true);
        }
    }, [
        identificationDocExpiryDate,
        identificationDocRef,
        identificationDocType,
        identificationDocumentImage,
        identificationIssueDate,
        picture,
        proofOfAddressImage,
        watchDocumentRefNumber,
        watchDocumentType,
        watchIdexpiryDate,
        watchIdissueDate,
        watchPictureUpload,
        watchproofOfIdentification,
        watchproofOfResidence,
    ]);

    const navigateToSummary = () => {
        navigate(paths.SUMMARY, { replace: true });
    };

    const [showFullPic, setShowFullPic] = useState(false);
    const [currentPicValue, setCurrentPicValue] = useState<string | null>("");

    return (
        <>
            {currentPicValue ? (
                <div className="fixed top-0 left-0 right-0 w-full h-screen bg-black z-10 bg-opacity-75 flex justify-center items-center">
                    <div
                        className="absolute top-10 right-10  w-10 h-10 bg-secondaryColor text-primaryColor rounded-full text-2xl flex justify-center items-center cursor-pointer "
                        onClick={() => setCurrentPicValue("")}
                    >
                        <AiOutlineClose />
                    </div>
                    <img
                        src={"data:image/jpg;base64," + currentPicValue}
                        alt="your_image"
                        className="object-contain h-4/6  object-top"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    />
                </div>
            ) : (
                ""
            )}
            <form
                onSubmit={onSubmitForm}
                autoComplete="off"
                autoCorrect="off"
                autoSave="off"
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            >
                <div className="text-lg text-red-900 col-span-12 md:w-full">
                    Proof of Identification
                </div>

                {/* Document Type */}
                <div className="col-span-12 md:col-span-6">
                    <Controller
                        name="documentType"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DropDownOptions
                                placeholder="Document Type"
                                options={documentTypeDropdownOptions}
                                onChange={onChange}
                                value={value}
                                errorMessage={
                                    errors?.documentType?.value?.message
                                }
                            />
                        )}
                    />
                </div>

                {/*Document reference number*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Document Refernce Number"
                        type="text"
                        register={register("documentRefNumber")}
                        id="UpdateProfile__documentRefNumber"
                        errorMessage={errors.documentRefNumber?.message}
                    />
                </div>

                {/* expiry Date  */}
                <div className=" col-span-12 md:col-span-6">
                    <DateInputField
                        register={register("IdexpiryDate")}
                        placeholder="Expiry Date"
                        id="IdexpiryDate"
                        errorMessage={errors.IdexpiryDate?.message}
                    />
                </div>

                {/* issue Date  */}
                <div className=" col-span-12 md:col-span-6">
                    <DateInputField
                        register={register("IdissueDate")}
                        placeholder="Issue Date"
                        id="IdissueDate"
                        errorMessage={errors.IdissueDate?.message}
                    />
                </div>

                <div className="col-span-12">
                    <Controller
                        control={control}
                        name="proofOfIdentification"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <img
                                    className="object-cover h-20 md:h-80 w-full rounded-t-xl cursor-pointer"
                                    src={"data:image/png;base64," + value}
                                    alt="proof_of_address"
                                    onClick={() => setCurrentPicValue(value)}
                                />
                                <FileInput
                                    id="proofOfIdentification"
                                    onChange={onChange}
                                    value={value}
                                    errorMessage={
                                        errors.proofOfIdentification?.message
                                    }
                                    placeholder={"Proof of Identification"}
                                />
                            </>
                        )}
                    />
                </div>

                <div className="col-span-12" />

                {/* Profile Picture */}
                <div className="col-span-12">
                    <Controller
                        control={control}
                        name="picture"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <img
                                    className="object-cover h-20 md:h-80 w-full rounded-t-xl cursor-pointer"
                                    src={"data:image/png;base64," + value}
                                    alt="proof_of_address"
                                    onClick={() => setCurrentPicValue(value)}
                                />
                                <FileInput
                                    id="picture"
                                    onChange={onChange}
                                    value={value}
                                    errorMessage={errors.picture?.message}
                                    placeholder={"Upload Picture"}
                                />
                            </>
                        )}
                    />
                </div>

                <div className="col-span-12">
                    <Controller
                        control={control}
                        name="proofOfResidence"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <img
                                    className="object-cover h-20 md:h-80 w-full rounded-t-xl cursor-pointer"
                                    src={"data:image/png;base64," + value}
                                    alt="proof_of_address"
                                    onClick={() => setCurrentPicValue(value)}
                                />
                                <FileInput
                                    id="proofOfResidence"
                                    onChange={onChange}
                                    value={value}
                                    errorMessage={
                                        errors.proofOfResidence?.message
                                    }
                                    placeholder={"Proof of Residence"}
                                />
                            </>
                        )}
                    />
                </div>

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
        </>
    );
}

export default Form;
