import { Controller, useForm } from "react-hook-form";
import Dropdown from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import PhoneField from "../../shared/TextFields/PhoneField";
import { isValidPhoneNumber } from "react-phone-number-input";

function EditPersonalDetailsForm() {
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

    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const watchGender = watch("gender");
    const watchMaritalStatus = watch("maritalStatus");
    return (
        <form
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            autoSave="off"
            autoComplete="off"
        >
            {/*fullname */}
            <div className=" col-span-12 md:col-span-6 ">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditProfileDetails__fullname"></label>
                    <input
                        {...register("fullname")}
                        type="text"
                        pattern={"[0-9]*"}
                        formNoValidate={true}
                        id="EditProfileDetails__fullname"
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

            {/*email address */}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditProfileDetails__emailAddress"></label>
                    <input
                        type="text"
                        {...register("emailAddress")}
                        id="EditProfileDetails__emailAddress"
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
                                    watchGender ? "text-black" : "text-gray-400"
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

            {/*CSCS account number*/}
            <div className=" col-span-12 ">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditProfileDetails__cscsNumber"></label>
                    <input
                        {...register("cscsNumber")}
                        type="text"
                        formNoValidate={true}
                        id="EditProfileDetails__cscsNumber"
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

            {/*Nin Number*/}
            <div className=" col-span-12 ">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditProfileDetails__nin"></label>
                    <input
                        {...register("nin")}
                        type="text"
                        formNoValidate={true}
                        id="EditProfileDetails__nin"
                        className="outline-none pb-4  w-full"
                        placeholder="NIN"
                    />
                </div>
                {errors.cscsNumber && (
                    <p className="text-xs text-red-900 ">
                        {errors.cscsNumber?.message}
                    </p>
                )}
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

            {/*bvn*/}
            <div className=" col-span-12 ">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditProfileDetails__bvn"></label>
                    <input
                        {...register("bvn")}
                        type="text"
                        formNoValidate={true}
                        id="EditProfileDetails__bvn"
                        className="outline-none pb-4  w-full"
                        placeholder="BVN"
                    />
                </div>
                {errors.cscsNumber && (
                    <p className="text-xs text-red-900 ">
                        {errors.cscsNumber?.message}
                    </p>
                )}
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
