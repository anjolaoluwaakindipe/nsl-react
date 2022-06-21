import { Controller, useForm } from "react-hook-form";
import Dropdown from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import PhoneField from "../../shared/Inputs/TextFields/PhoneField";
import { isValidPhoneNumber } from "react-phone-number-input";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import { joiResolver } from '@hookform/resolvers/joi';
import { personalDetailsFormSchema } from '../../../utils/validation/updateProfile';

import Drop from "../../shared/Dropdowns/DropOptions";

function EditPersonalDetailsForm() {
    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver: joiResolver(personalDetailsFormSchema)});

 
    const maritalStatusDropdownOptions = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorce", label: "Divorce" },
        { value: "Widow", label: "Widow" },
        { value: "Remarried", label: "Remarried" },
    ];

    const watchGender = watch("gender");
    const watchMaritalStatus = watch("maritalStatus");
    return (
        <form
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            autoSave="off"
            autoComplete="off"
        >
            {/*firstname */}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="title"
                    type="text"
                    register={register("title")}
                    registerName="title"
                    id="EditProfileDetails__title"
                    errorMessage={errors.title?.message}
                />
            </div>

            {/*firstname */}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="First Name"
                    type="text"
                    register={register("firstName")}
                    registerName="FirstName"
                    id="EditProfileDetails__FirstName"
                    errorMessage={errors.firstName?.message}
                />
            </div>

            {/*Last Nmae */}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="Last Name"
                    type="text"
                    register={register("lastName")}
                    registerName="lastName"
                    id="EditProfileDetails__LastName"
                    errorMessage={errors.lastName?.message}
                />
            </div>

            {/*Other Name */}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="Other Names"
                    type="text"
                    register={register("otherName")}
                    registerName="otherName"
                    id="EditProfileDetails__LastName"
                    errorMessage={errors.otherName?.message}
                />
            </div>

            {/*email address */}
            <div className=" col-span-12 md:col-span-6">
                <FloatingPlaceholderTextField
                    placeholder="Email Address"
                    type="text"
                    id="EditProfile__emailAddress"
                    register={register("emailaddress")}
                    registerName="Email Address"
                    errorMessage={errors.emailAddress?.message}
                />
            </div>

            {/*Phone Number*/}
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
                            <PhoneField
                                phoneElementClassName="pb-4 space-x-4 max-h-10"
                                onChange={onChange}
                                value={value}
                                placeholder="Phone Number"
                                style={{ borderRadius: "0px" }}
                            />
                        )}
                    />
                </div>
                <p className="text-xs text-red-900 ">
                    {errors.phoneNumber?.message}
                </p>
            </div>

            {/*Gender*/}
            <div className="col-span-12 md:col-span-6">
                <Drop a="gender" />
            </div>

            {/*Date Of Birth*/}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor ">
                    <label htmlFor="EditProfileDetails_dateOfBirth"> </label>
                    <input
                        type="text"
                        {...register("dateOfBirth")}
                        id="EditProfileDetails__dateOfBirth"
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
                    <p className="text-xs text-red-900  ">
                        {errors?.gender?.value?.message}
                    </p>
                }
            </div>

            {/*CSCS account number*/}
            <div className=" col-span-12  md:col-span-6">
                <FloatingPlaceholderTextField
                    placeholder="CSCS Number"
                    type="text"
                    register={register("cscsNumber")}
                    registerName="CSCS Number"
                    id="EditProfileDetails__cscsNumber"
                    errorMessage={errors.cscsNumber?.message}
                />
            </div>

            {/*Nin Number*/}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="NIN"
                    type="text"
                    register={register("nin")}
                    registerName="NIN"
                    id="EditProfileDetails__nin"
                    errorMessage={errors.nin?.message}
                />
            </div>

            {/*bvn*/}
            <div className=" col-span-12 ">
                <FloatingPlaceholderTextField
                    placeholder="BVN"
                    type="text"
                    register={register("bvn")}
                    registerName="BVN"
                    id="EditProfileDetails__bvn"
                    errorMessage={errors.bvn?.message}
                />
            </div>

            {/*bvn*/}
            <div className=" col-span-12 md:col-span-6 ">
                <FloatingPlaceholderTextField
                    placeholder="BVN"
                    type="text"
                    register={register("bvn")}
                    registerName='BVN'
                    id="EditProfileDetails__bvn"
                    errorMessage={errors.cscsNumber?.message}
                />
            </div>

            {/*residential address*/}
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
            {/*save button */}
            <div className="col-span-12">
                <button
                    className={`btn1  float-right w-full md:w-48`}
                    type="submit"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default EditPersonalDetailsForm;
