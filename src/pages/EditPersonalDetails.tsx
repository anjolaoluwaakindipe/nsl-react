import React from "react";

import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { joiResolver } from "@hookform/resolvers/joi";
import { EditPersonalDetailsInfo } from "../typings";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";



function Header() {
    return (

        <div>
            <h1 className="heading1">Update Profile</h1>
        </div>
    );
}

function EditPersonalDetails() {
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

    // const {
    //     register,
    //     control,
    //     watch,
    //     handleSubmit,
    //     formState: { errors },
    // }



    // const watchGender = watch("gender");


    return (

        <div>
            <div>
                <h1 className="heading1">Edit Personal Details</h1>
            </div>

            {/*details */}
            <form
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoSave="off"
                autoComplete="off"
            >
                {/*fullname */}
                <div className="cols-span-12 md:col-span-6">

                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__fullName"></label>
                        <input
                            type="text"
                            id="EditProfileDetails__fullName"
                            className="outline-none pb-4  w-full"
                            placeholder="Full Name"
                        />
                    </div>
                </div>



                {/*email address */}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__emailAddress"></label>
                        <input
                            type="text"
                            max={10}
                            id="EditProfileDetails__emailAddress"
                            className="outline-none pb-4  w-full"
                            placeholder="Email Address"
                        />
                    </div>

                </div>

                {/*Phone Number*/}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__phoneNumber"></label>
                        <input
                            type="number"
                            max={11}
                            id="EditProfileDetails__phoneNumber"
                            className="outline-none pb-4  w-full"
                            placeholder="PhoneNumber"
                        />
                    </div>
                </div>

                {/*Gender*/}
                <div className=" col-span-12 md:col-span-6">


                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__gender"></label>
                        <input
                            type="text"
                            max={10}
                            id="EditProfileDetails__gender"
                            className="outline-none pb-4  w-full"
                            placeholder="Gender"
                        />
                    </div>




                </div>

                {/*Date Of Birth*/}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__dateOfbirth"></label>
                        <input
                            type="text"
                            max={10}
                            id="EditProfileDetails__dateOfbirth"
                            className="outline-none pb-4  w-full"
                            placeholder="Date Of Birth"
                        />
                    </div>
                </div>

                {/*Marital Status*/}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__maritalStatus"></label>
                        <input
                            type="text"
                            max={10}
                            id="EditProfileDetails__maritalStatus"
                            className="outline-none pb-4  w-full"
                            placeholder="Marital Status"
                        />
                    </div>
                </div>


                {/*CSCS account number*/}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__cscsAccountNumber"></label>
                        <input
                            type="number"
                            max={10}
                            id="EditProfileDetails__cscsAccountNumber"
                            className="outline-none pb-4  w-full"
                            placeholder="CSCS Account Number"
                        />
                    </div>
                </div>

                {/*Nin Number*/}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__NinNumber"></label>
                        <input
                            type="number"
                            max={10}
                            id="EditProfileDetails__NinNumber"
                            className="outline-none pb-4  w-full"
                            placeholder="NIN Number"
                        />
                    </div>
                </div>


                {/*residential address*/}
                <div className="col-span-12">
                    <div className=" border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="UpdateProfile_residentialAddress"></label>
                        <textarea

                            id="UpdateProfile_narration"
                            className="outline-none bg-bgColor pb-4  resize-none h-32 p-3 w-full border-0 "
                            placeholder="Residential Address"
                        ></textarea>
                    </div>
                </div>

                {/*bvn*/}
                <div className=" col-span-12 md:col-span-6">
                    <div className="border-0 border-b-2 border-underlineColor">
                        <label htmlFor="EditProfileDetails__emailAddress"></label>
                        <input
                            type="number"
                            max={10}
                            id="EditProfileDetails__emailAddress"
                            className="outline-none pb-4  w-full"
                            placeholder="BVN Number"
                        />
                    </div>
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
        </div>



    );

}

export default EditPersonalDetails;