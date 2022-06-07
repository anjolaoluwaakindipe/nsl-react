import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../../utils/validation/login";
import { LoginInfo } from "../../../typings";
import { paths } from "../../../utils/constants/allPaths";

import { useModal } from "../../../services/customHooks/useModal";


function Form() {
    
    const navigate=  useNavigate()
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

    const onProceed = ()=> {
        navigate(paths.LOGIN,{replace:true});
    };

    const {openModalFunc}= useModal (
        "LoginSucessModal",
        //"LoginUnsucessfulModal",
        true,
    
    );

    const onSubmit = handleSubmit(async (data) => {
        // dispatch(loginUser([data.usernameOrEmail, data.password]))

        openModalFunc();
    });

    

    return (
        <form
            onSubmit={onSubmit}
            className="w-full py-20 space-y-16  text-darkTextColor text-base md:text-xl"
        >
            <div>
                <div className="w-full  border-0 border-b-2  border-underlineColor">
                    <label htmlFor="cscsAccountNumber"></label>
                    <input
                        type="text"
                        {...register("usernameOrEmail")}
                        id="Login__cscsAccountNumber"
                        className="outline-none pb-4  w-full"
                        placeholder="Email Address"
                    />
                </div>

                {errors.usernameOrEmail && (
                    <p className="text-xs text-red-900 ">
                        {errors.usernameOrEmail?.message}
                    </p>
                )}
            </div>

            <div className="w-full space-y-5">
                <div>
                    <div className="w-full border-0 border-b-2  border-underlineColor ">
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            {...register("password")}
                            id="Login__password"
                            className="outline-none pb-4 w-full border-0 "
                            placeholder="Password"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-900 ">
                            {errors.password?.message}
                        </p>
                    )}
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
                <button className="btn1 w-full" type="submit">
                    Proceed
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
