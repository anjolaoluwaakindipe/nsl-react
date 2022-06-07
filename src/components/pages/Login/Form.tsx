import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../../utils/validation/login";
import { LoginInfo } from "../../../typings";

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
        navigate("/login",{replace:true});
    };

    const {openModalFunc}= useModal (
        //"LoginSucessModal",
        "LoginUnsucessfulModal",
        false,
        ()=> {
            onProceed();
        }
    );

    const onSubmit = handleSubmit(async (data) => {
        // dispatch(loginUser([data.usernameOrEmail, data.password]))

        openModalFunc();
    });

    

    return (
        <form
            onSubmit={onSubmit}
            className="w-full py-20 space-y-16  text-darkTextColor"
        >
            <div>
                <div className="w-full md:w-1/2 border-0 border-b-2  border-underlineColor">
                    <label htmlFor="cscsAccountNumber"></label>
                    <input
                        type="text"
                        {...register("usernameOrEmail")}
                        id="Login__cscsAccountNumber"
                        className="outline-none pb-4  w-full"
                        placeholder="Email"
                    />
                </div>

                {errors.usernameOrEmail && (
                    <p className="text-xs text-red-900 ">
                        {errors.usernameOrEmail?.message}
                    </p>
                )}
            </div>

            <div className="w-full md:w-1/2  space-y-5">
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
                    <Link className="text-accentColor" to={"/"}>
                        Forgot Password?
                    </Link>
                </div>
            </div>

            <div className=" w-full md:w-1/2 space-y-6">
                <button
                    className="w-full px-5 py-4 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all"
                    type="submit"
                    onClick={()=>{}}
                >
                    Proceed
                </button>
            </div>
        </form>
    );
}

export default Form;
