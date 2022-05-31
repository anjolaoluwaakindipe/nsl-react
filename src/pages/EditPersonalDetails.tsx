import React from "react";

import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import NavBarLayout from "../components/layout/NavBarLayout";
import DefaultLayout from "../components/layout/DefaultLayout";
import { AiFillCloseCircle } from "react-icons/ai";
import EditPersonalDetailsForm from "../components/pages/EditPersonalDetails/EditPersonalDetailsForm";

function EditPersonalDetails() {
    const navigate = useNavigate();

    return (
        <NavBarLayout>
            <DefaultLayout>
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="heading1">Personal Details</h1>

                        <AiFillCloseCircle
                            className="text-2xl text-primaryColor cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                    </div>

                    <EditPersonalDetailsForm />
                </>
            </DefaultLayout>
        </NavBarLayout>
    );
}

export default EditPersonalDetails;
