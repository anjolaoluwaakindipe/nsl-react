import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneField from "../../shared/Inputs/TextFields/PhoneField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import { isValidPhoneNumber } from 'react-phone-number-input';
import { EditEmploymentInfo } from "../../../typings";
import { editEmploymentDetailsFormSchema } from '../../../utils/validation/editProfile';
import CurrencyInputField from '../../shared/Inputs/TextFields/CurrencyInputField';
import { authSelector, updateUserEmploymentDetailsFull } from '../../../state/redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { AppDispatch } from '../../../state/redux/store';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../utils/constants/allPaths';

function EditEmploymentDetailsForm() {
    // react-hook-form
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        watch,
    } = useForm<EditEmploymentInfo>({
        resolver: joiResolver(editEmploymentDetailsFormSchema),
        defaultValues: { companyPhoneNumber: "" },
    });

    // react-redux variables
    const dispatch = useDispatch<AppDispatch>();

    // react router varaible
    const navigate = useNavigate()

    // button state
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [canBeUpdated, setCanBeUpdated] = useState(false);

    // employment information from state
    const {
        companyAddress,
        companyEmail,
        companyName,
        companyPhoneNumber,
        grossIncome,
        jobTitle,
        natureOfBusiness,
    } = useSelector(authSelector).user!.employmentInfo;

    const { user } = useSelector(authSelector);

    // state values of all input fields
    const watchCompanyAddress = watch("companyAddress");
    const watchCompanyEmail = watch("companyEmailAddress");
    const watchCompanyName = watch("companyName");
    const watchCompanyPhoneNumber = watch("companyPhoneNumber");
    const watchJobTitle = watch("jobTitle");
    const watchNatureOfBusiness = watch("natureOfBusiness");
    const watchGrossIncome = watch("grossIncome")

    // update fields if data was receive from server
    useEffect(() => {
        if (companyAddress) {
            setValue("companyAddress", companyAddress);
        }
        if (companyEmail) {
            setValue("companyEmailAddress", companyEmail);
        }
        if (companyName) {
            setValue("companyName", companyName);
        }
        if (companyPhoneNumber) {
            setValue("companyPhoneNumber", companyPhoneNumber);
        }
        if (jobTitle) {
            setValue("jobTitle", jobTitle);
        }
        if (natureOfBusiness) {
            setValue("natureOfBusiness", natureOfBusiness);
        }
        if (grossIncome) {
            setValue("grossIncome", grossIncome);
        }
    }, [
        companyAddress,
        companyEmail,
        companyName,
        companyPhoneNumber,
        grossIncome,
        jobTitle,
        natureOfBusiness,
        setValue,
      
    ]);

    // prevent update if information is the same 
    useEffect(() => {
        if (
            companyAddress === watchCompanyAddress &&
            companyEmail === watchCompanyEmail &&
            companyName === watchCompanyName &&
            companyPhoneNumber === watchCompanyPhoneNumber &&
            jobTitle === watchJobTitle &&
            natureOfBusiness === watchNatureOfBusiness &&
            (grossIncome === watchGrossIncome ||
                grossIncome === watchGrossIncome.replace(",", ""))
        ) {
            setCanBeUpdated(false);
        }else{
            setCanBeUpdated(true);
        }
    }, [
        companyAddress,
        companyEmail,
        companyName,
        companyPhoneNumber,
        grossIncome,
        jobTitle,
        natureOfBusiness,
        watchCompanyAddress,
        watchCompanyEmail,
        watchCompanyName,
        watchCompanyPhoneNumber,
        watchJobTitle,
        watchNatureOfBusiness,
        watchGrossIncome
    ]);

    const onSubmitForm = handleSubmit(async (data) => {
        const userInfo = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            title: user?.title,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            bvn: user?.bvn,
            maritalStatus: user?.maritalStatus,
            gender: user?.gender,
            middleName: user?.middleName,
            dateOfBirth: user?.dateOfBirth?.includes("T")
                ? user?.dateOfBirth?.split("T")[0]
                : user?.dateOfBirth,
            cscsNumber: user?.cscsNumber,
            residentialAddress: user?.residentialAddress,
            picture: user?.picture,
            identificationDocumentImage: user?.identificationDocumentImage,
            identificationDocExpiryDate:
                user?.identificationDocExpiryDate?.includes("T")
                    ? user?.identificationDocExpiryDate?.split("T")[0]
                    : user?.identificationDocExpiryDate,
            identificationDocRef: user?.identificationDocRef,
            identificationIssueDate: user?.identificationIssueDate?.includes(
                "T"
            )
                ? user?.identificationIssueDate?.split("T")[0]
                : user?.identificationIssueDate,
            identificationDocType: user?.identificationDocType,
            proofOfAddressImage: user?.proofOfAddressImage,
        };
        setButtonLoading(true);
        await dispatch(
            updateUserEmploymentDetailsFull({
                jobTitle: data.jobTitle!,
                companyAddress: data.companyAddress!,
                companyEmail: data.companyEmailAddress!,
                companyName: data.companyName!,
                companyPhoneNumber: data.companyPhoneNumber!,
                grossIncome: data.grossIncome!.replace(",", ""),
                natureOfBusiness: data.natureOfBusiness!,
                inputStatus: "Draft",
                userInfo: {...userInfo, inputStatus: "Draft"},
                cb: navigateToProfile,
            })
        );
        // navigate("/update-profile/employment-details");

        setButtonLoading(false);
    });

    const navigateToProfile = () =>{
        navigate(paths.SUMMARY, {replace: true})
    }

    return (
        <form
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            autoSave="off"
            autoComplete="off"
            onSubmit={onSubmitForm}
        >
            {/* title*/}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="Job Title"
                    type="text"
                    register={register("jobTitle")}
                    registerName="jobTitle"
                    id="UpdateProfile__title"
                    errorMessage={errors.jobTitle?.message}
                />
            </div>

            {/*company name*/}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="Company Name"
                    type="text"
                    register={register("companyName")}
                    registerName="Company Name"
                    id="UpdateProfile__companyName"
                    errorMessage={errors.companyName?.message}
                />
            </div>

            {/*work sector*/}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="Nature of Business"
                    type="text"
                    register={register("natureOfBusiness")}
                    id="UpdateProfile__natureOfBusiness"
                />
            </div>

            {/* company Phone Number */}
            <div className="md:col-span-6 col-span-12 ">
                <Controller
                    name="companyPhoneNumber"
                    control={control}
                    rules={{
                        validate: (value) =>
                            isValidPhoneNumber(value || "") ||
                            "Not a valid International Number",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <PhoneField
                            placeholder="Comany Phone Number"
                            phoneElementClassName="pb-4 space-x-4 max-h-10"
                            onChange={onChange}
                            value={value!}
                            style={{ borderRadius: "0px" }}
                            errorMessage={errors.companyPhoneNumber?.message}
                        />
                    )}
                />
            </div>

            {/*company email Address*/}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="Company Email Address"
                    type="text"
                    register={register("companyEmailAddress")}
                    id="UpdateProfile__companyEmailAddress"
                    errorMessage={errors.companyEmailAddress?.message}
                />
            </div>

            {/*salary range*/}
            <div className=" col-span-12 md:col-span-6 ">
                <Controller
                    control={control}
                    name="grossIncome"
                    render={({ field: { onChange, value } }) => (
                        <CurrencyInputField
                            placeholder="Gross Income"
                            value={value}
                            onChange={onChange}
                            id="UpdateProfile__grossIncome"
                            errorMessage={errors.grossIncome?.message}
                        />
                    )}
                />
            </div>

            <div className="col-span-12">
                <div className=" border-0 border-b-2  border-underlineColor ">
                    <label htmlFor="UpdateProfile_companyAddress"></label>
                    <textarea
                        {...register("companyAddress")}
                        id="UpdateProfile_narration"
                        className="outline-none bg-bgColor pb-4  resize-none h-32 p-3 w-full border-0 "
                        placeholder="Company Address"
                    ></textarea>
                </div>
                {
                    <p className="text-xs text-red-900 ">
                        {errors?.companyAddress?.message}
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
                    {isButtonLoading ? "Loading..." : "Next"}
                </button>
            </div>
        </form>
    );
}

export default EditEmploymentDetailsForm;
