import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneField from "../../shared/TextFields/PhoneField";

function EditEmploymentDetailsForm() {
    const { register, formState, handleSubmit, control } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            companyName: "",
            companyPhoneNumber: undefined,
            workSector: "",
            companyEmailAddress: "",
            salaryRange: "",
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            autoSave="off"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            {/*Title */}
            <div className="col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditEmploymentDetails__title"></label>
                    <input
                        type="text"
                        {...register("title", { required: false })}
                        id="EditProfileDetails__fullName"
                        className="outline-none pb-4  w-full"
                        placeholder="Title"
                    />
                </div>
            </div>

            {/*Company Name */}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditEmploymentDetails__companyName"></label>
                    <input
                        type="text"
                        max={10}
                        {...register("companyName", { required: false })}
                        id="EditEmploymentDetails__companyName"
                        className="outline-none pb-4  w-full"
                        placeholder="Company Name"
                    />
                </div>
            </div>

            {/*Company Phone Number*/}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    
                    <Controller
                        control={control}
                        name="companyPhoneNumber"
                        render={({ field: { onChange, value } }) => (
                            <PhoneField
                                onChange={onChange}
                                value={value}
                                placeholder="Company's Phone Number"
                                style={{ borderRadius: "0px" }}
                                phoneElementClassName="pb-4 space-x-4 max-h-10"
                            />
                        )}
                    />
                </div>
            </div>

            {/*work sector (dropdown)*/}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditEmploymentDetails__workSector"></label>
                    <input
                        type="text"
                        max={10}
                        {...register("workSector", { required: false })}
                        id="EditEmploymentDetails__workSector"
                        className="outline-none pb-4  w-full"
                        placeholder="Work Sector"
                    />
                </div>
            </div>

            {/*company email address*/}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditEmploymentDetails__CompanyEmailAddress"></label>
                    <input
                        type="text"
                        max={10}
                        {...register("companyEmailAddress", {
                            required: false,
                        })}
                        id="EditEmploymentDetails__ComapnyEmailAddress"
                        className="outline-none pb-4  w-full"
                        placeholder="Company's Email Address"
                    />
                </div>
            </div>

            {/*salary range*/}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditEmploymentDetails__SalaryRange"></label>
                    <input
                        type="text"
                        max={10}
                        {...register("salaryRange", { required: false })}
                        id="EditEmploymentDetails__SalaryRange"
                        className="outline-none pb-4  w-full"
                        placeholder="Salary Range"
                    />
                </div>
            </div>

            {/*save button */}
            <div className="col-span-12">
                <button
                    className={`btn1  float-right w-full md:w-48`}
                    type="submit"
                    disabled={!formState.isDirty}
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default EditEmploymentDetailsForm;
