import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    authSelector,
    updateUserEmploymentDetailsFull,
} from "../../../state/authSlice";
import { AppDispatch } from "../../../state/store";
import { EmploymentDetailsFormInfo } from "../../../typings";
import { paths } from "../../../utils/constants/allPaths";
import { employmentDetailsFormSchema } from "../../../utils/validation/updateProfile";
import CurrencyInputField from "../../shared/Inputs/TextFields/CurrencyInputField";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import PhoneField from "../../shared/Inputs/TextFields/PhoneField";
import Progress from "./Progress";
import formatMoney from "../../../utils/moneyFormatter";

function EmploymentDetailsForm() {
    const {
        companyAddress,
        companyEmail,
        companyName,
        companyPhoneNumber,
        grossIncome,
        jobTitle,
        natureOfBusiness,
    } = useSelector(authSelector).user!.employmentInfo;

    const navigate = useNavigate();
    // loading button control
    const [isButtonLoading, setButtonLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const finishedRequest = useRef(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        getValues,
    } = useForm<EmploymentDetailsFormInfo>({
        resolver: joiResolver(employmentDetailsFormSchema),
        defaultValues: { companyPhoneNumber: "" },
    });

    const navigateToAccountDetailForm = () => {
        navigate(
            paths.UPDATE_PROFILE.base + paths.UPDATE_PROFILE.ACCOUNT_DETAILS
        );
    };

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
    console.log(getValues());

    // const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     navigate("/update-profile/account-details");
    // };

    const onSubmitForm = handleSubmit(async (data) => {
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
                cb: navigateToAccountDetailForm,
            })
        );
        // navigate("/update-profile/employment-details");

        finishedRequest.current = true;

        setButtonLoading(false);
    });

    return (
        <div>
            <div className="flex justify-between items-center pt-10 pb-5 border-b-2 border-gray-200">
                <h4 className="text-accentColor ">Employment Details</h4>
                <Progress />
            </div>

            <form
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoComplete="off"
                autoSave="off"
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
                            <div>
                                <PhoneField
                                    placeholder="Comany Phone Number"
                                    phoneElementClassName="pb-4 space-x-4 max-h-10"
                                    onChange={onChange}
                                    value={value!}
                                    style={{ borderRadius: "0px" }}
                                    errorMessage={
                                        errors.companyPhoneNumber?.message
                                    }
                                />
                            </div>
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

                <div className="col-span-12 flex justify-between">
                    <button
                        type="button"
                        className={`btn1 bg-transparent border-2 hover:bg-transparent border-primaryColor text-primaryColor  w-full md:w-48`}
                        onClick={() =>
                            navigate(
                                paths.UPDATE_PROFILE.base +
                                    paths.UPDATE_PROFILE.PERSONAL_DETAILS
                            )
                        }
                    >
                        Previous
                    </button>

                    <button
                        className={`btn1   w-full md:w-48`}
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

export default EmploymentDetailsForm;
