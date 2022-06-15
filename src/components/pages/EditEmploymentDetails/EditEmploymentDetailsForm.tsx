import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneField from "../../shared/TextFields/PhoneField";
import FloatingPlaceholderTextField from "../../shared/TextFields/FloatingPlaceholderTextField";

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
                <FloatingPlaceholderTextField
                    placeholder="Title"
                    type="text"
                    register={register}
                    registerName='Title'
                    id="EditEmploymentDetails__title"
                />
            </div>

            {/*Company Name */}
            <div className=" col-span-12 md:col-span-6">
                <FloatingPlaceholderTextField
                    placeholder="Company Name"
                    type="text"
                    register={register}
                    registerName='Commpany Name'
                    id="EditEmploymentDetails__companyName"
                />
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
                <FloatingPlaceholderTextField
                    placeholder="Work Sector"
                    type="text"
                    register={register}
                    registerName='Work Sector'
                    id="EditEmploymentDetails__workSector"
                />
            </div>

            {/*company email address*/}
            <div className=" col-span-12 md:col-span-6">
                <FloatingPlaceholderTextField
                    placeholder="Company Email Address"
                    type="text"
                    register={register}
                    registerName='Company Email Address'
                    id="EditEmploymentDetails__CompanyEmailAddress"
                />
            </div>

            {/*salary range*/}
            <div className=" col-span-12 md:col-span-6">
               <FloatingPlaceholderTextField
                    placeholder="Salary Range"
                    type="text"
                    register={register}
                    registerName='Salary Range'
                    id="EditEmploymentDetails__SalaryRange"
                />
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
