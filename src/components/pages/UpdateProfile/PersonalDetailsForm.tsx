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

function PersonalDetailsForm() {
    const navigate = useNavigate();

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/update-profile/employment-details");
    };

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useForm();

    const watchPictureUpload = watch("pictureUpload");

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
                <div className=" col-span-12 md:col-span-6 ">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__fullName"></label>
                        <input
                            type="text"
                            pattern={"[0-9]*"}
                            formNoValidate={true}
                            id="UpdateProfile__fullname"
                            className="outline-none pb-4  w-full"
                            placeholder="Full Name"
                        />
                    </div>
                    {/* {validationErrors.accountNumber && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountNumber}
                        </p>
                    )} */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__emailAddress"></label>
                        <input
                            type="text"
                            max={10}
                            id="UpdateProfile__emailAddress"
                            className="outline-none pb-4  w-full"
                            placeholder="Email Address"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>
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
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__gender"></label>
                        <input
                            type="text"
                            id="UpdateProfile__gender"
                            className="outline-none pb-4  w-full"
                            placeholder="Gender"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile_dateOfBirth"></label>
                        <input
                            type="text"
                            max={10}
                            id="UpdateProfile__dateOfBirth"
                            className="outline-none pb-4  w-full"
                            placeholder="Date of Birth"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="UpdateProfile__dateOfBirth"></label>
                        <input
                            type="text"
                            id="UpdateProfile__dateOfBirth"
                            className="outline-none pb-4  w-full"
                            placeholder="Date of Birth"
                        />
                    </div>
                    {/* {validationErrors.accountBank && (
                        <p className="text-xs text-red-900 ">
                            {validationErrors.accountBank}
                        </p>
                    )} */}
                </div>

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
                            {errors?.narration?.message}
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
                            {...register("passport")}
                            id="UpdateProfile__picture"
                            className="outline-none pb-4 hidden"
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>

                <div className="col-span-12">
                    <button className={`btn1 bg-darkTextColor float-right w-full md:w-48`} type="submit">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetailsForm;
