import React from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import NavBarLayout from '../components/layout/NavBarLayout';
import DefaultLayout from '../components/layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { EditEmploymentDetailsForm } from "../components/pages/EditEmploymentDetails";

function EditEmploymentDetails() {
    const navigate = useNavigate();
    return (
        <NavBarLayout>
            <DefaultLayout>
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="heading1">Employment Details</h1>

                        <AiFillCloseCircle
                            className="text-2xl text-primaryColor cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                    </div>

                    <EditEmploymentDetailsForm />
                </>
            </DefaultLayout>
        </NavBarLayout>
    );
}


export default EditEmploymentDetails;
