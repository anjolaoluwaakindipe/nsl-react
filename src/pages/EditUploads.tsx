import React from "react";
import Form from "../components/pages/EditUploads/Form";
import NavBarLayout from "../components/layout/NavBarLayout";
import DefaultLayout from "../components/layout/DefaultLayout";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function EditUploads() {
    const navigate = useNavigate();
    return (
        <NavBarLayout>
            <DefaultLayout>
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="heading1">Uploads</h1>

                        <AiFillCloseCircle
                            className="text-2xl text-primaryColor cursor-pointer"
                            onClick={() => navigate("/profile")}
                        />
                    </div>

                    <Form />
                </>
            </DefaultLayout>
        </NavBarLayout>
    );
}

export default EditUploads;
