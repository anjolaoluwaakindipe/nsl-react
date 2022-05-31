import React from "react";

function EditEmploymentDetails(){
    return(
        <div>
        <div>
            <h1 className="heading1">Edit Employment Details</h1>
        </div>

        {/*details */}
        <form
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            autoSave="off"
            autoComplete="off"
        >
            {/*Title */}
            <div className="cols-span-12 md:col-span-6">

                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditEmploymentDetails__title"></label>
                    <input
                        type="text"
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
                        id="EditEmploymentDetails__companyName"
                        className="outline-none pb-4  w-full"
                        placeholder="Company Names"
                    />
                </div>

            </div>

            {/*Company Phone Number*/}
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="EditEmploymentDetails__CompanyphoneNumber"></label>
                    <input
                        type="number"
                        max={11}
                        id="EditEmploymenttDetails__CompanyphoneNumber"
                        className="outline-none pb-4  w-full"
                        placeholder="Company PhoneNumber"
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
                        id="EditEmploymentDetails__ComapnyEmailAddress"
                        className="outline-none pb-4  w-full"
                        placeholder="Company Email Address"
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
                >
                    Save
                </button>
            </div>
        </form>
    </div>
    );
}


export default EditEmploymentDetails;