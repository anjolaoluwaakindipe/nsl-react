import React from "react";
import Progress from "./Progress";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import FloatingPlaceholderTextField from "../../shared/TextFields/FloatingPlaceholderTextField";

function EmploymentDetailsForm() {
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
    } = useForm();

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigate("/update-profile/account-details");
    };

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
                        placeholder="Title"
                        type="text"
                        register={register("title")}
                        registerName='Account Name'
                        id="UpdateProfile__title"
                        errorMessage={errors.title?.message}
                    />
                </div>



                {/*company name*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Company Name"
                        type="text"
                        register={register("company")}
                        registerName='Company Name'
                        id="UpdateProfile__companyName"

                    />
                </div>




                {/*work sector*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Work Sector"
                        type="text"
                        register={register("worksector")}
                        id="UpdateProfile__workSector"

                    />
                </div>



                {/*company phone number*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Company PhoneNumber"
                        type="text"
                        register={register("companyPhoneNumber")}
                        id="UpdateProfile__companyPhoneNumber"

                    />
                </div>




                {/*company email Address*/}
                <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Company Email Address"
                        type="text"
                        register={register("companyEmailAddress")}
                        id="UpdateProfile__companyEmailAddress"

                    />
                </div>

                

                 {/*salary range*/}
                 <div className=" col-span-12 md:col-span-6 ">
                    <FloatingPlaceholderTextField
                        placeholder="Salary Range"
                        type="text"
                        register={register("salaryRange")}
                        id="UpdateProfile__salaryRange"
                        
                    />
                </div>

                <div className="col-span-12">
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="UpdateProfile_residentialAddress"></label>
                        <textarea
                            {...register("residentialAddress")}
                            id="UpdateProfile_narration"
                            className="outline-none bg-bgColor pb-4  resize-none h-32 p-3 w-full border-0 "
                            placeholder="Company Residential Address"
                        ></textarea>
                    </div>
                    {
                        <p className="text-xs text-red-900 ">
                            {errors?.narration?.message}
                        </p>
                    }
                </div>

                <div className="col-span-12 flex justify-between">
                    <button
                        className={`btn1 bg-transparent border-2 hover:bg-transparent border-primaryColor text-primaryColor  w-full md:w-48`}

                    >
                        Previous
                    </button>

                    <button
                        className={`btn1   w-full md:w-48`}
                        type="submit"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmploymentDetailsForm;
