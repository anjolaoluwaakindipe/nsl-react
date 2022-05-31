import React from "react";
import NavBarLayout from "../components/layout/NavBarLayout";
import DefaultLayout from "../components/layout/DefaultLayout";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Form from "../components/pages/EditAccountDetails/Form";

function EditAccountDetails() {
    const navigate = useNavigate();
    return (
        <NavBarLayout>
            <DefaultLayout>
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="heading1">Account Details</h1>

                        <AiFillCloseCircle
                            className="text-2xl text-primaryColor cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                    </div>

                    <Form />
                </>
            </DefaultLayout>
        </NavBarLayout>
    );
}

export default EditAccountDetails;
