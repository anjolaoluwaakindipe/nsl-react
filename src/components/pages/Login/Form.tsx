import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../../utils/validation/login";
import { LoginInfo } from "../../../typings";
import { paths } from "../../../utils/constants/allPaths";

import { useModal } from "../../../services/customHooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, loginUser } from "../../../state/authSlice";
import { AppDispatch } from "../../../state/store";
import { useEffect, useState } from "react";
import { makeUnCancellable, setModalName } from "../../../state/modalSlice";
import FloatingPlaceholderTextField from "../../shared/TextFields/FloatingPlaceholderTextField";

function Form() {
    const { isError, isLoading, errorMessage, isSuccess } =
        useSelector(authSelector);
    const [modalOptions, setModalOptions] = useState({
        name: "",
        isCancellable: true,
    });
    const [isButtonLoading, setButtonLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInfo>({
        defaultValues: {
            password: "",
            usernameOrEmail: "",
        },
        resolver: joiResolver(loginSchema),
    });

    const { openModalFunc } = useModal(
        // "LoginSucessModal",
        //"LoginUnsucessfulModal",
        modalOptions.name,
        modalOptions.isCancellable
    );

    useEffect(() => { }, [isLoading]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(makeUnCancellable({ cancellable: true }));
            dispatch(setModalName("LoginSucessModal"));
        }
        if (isError) {
            dispatch(setModalName("LoginUnsucessfulModal"));
        }
    }, [isError, isSuccess, dispatch, openModalFunc]);

    const onSubmit = handleSubmit(async (data) => {
        setButtonLoading(true)
        await dispatch(
            loginUser({ email: data.usernameOrEmail, password: data.password })
        );

        openModalFunc();
        setButtonLoading(false);
    });

    return (
        <form
            onSubmit={onSubmit}
            className="w-full py-20 space-y-16  text-darkTextColor text-base md:text-xl"
        >         
            {/* username*/}
            <div>
                <div className="" >
                    <FloatingPlaceholderTextField
                    placeholder="Email Address"
                    type= "text"
                    register={register("usernameOrEmail")}
                    registerName='usernameorEmail'
                    errorMessage={errors.usernameOrEmail?.message}
                    />
                </div>

               
            </div>
            {/* password*/}
            <div className="w-full space-y-5">
                <div>
                    <FloatingPlaceholderTextField
                    placeholder="Password"
                    type= "text"
                    register={register("password")}
                    registerName='Password'
                    errorMessage={errors.password?.message}
                    />
                </div>









                <div>
                    <Link
                        className="text-primaryColor text-base hover:underline"
                        to={paths.FORGOT_PASSWORD}
                    >
                        Forgot Password?
                    </Link>
                </div>
            </div>


            <div className=" w-full  space-y-6">
                <button className="btn1 w-full" type="submit" disabled={isButtonLoading}>
                    {isButtonLoading ? "Loading..." : "Proceed"}
                </button>

                <h6 className="text-center md:text-xl w-full">
                    Don't have an account?{" "}
                    <span className="text-primaryColor hover:underline">
                        <Link to={paths.CREATE_ACCOUNT}>Create account</Link>
                    </span>
                </h6>
            </div>
        </form>
    );
}

export default Form;
