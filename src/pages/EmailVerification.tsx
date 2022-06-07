import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import HalfNavBarLayout from "../components/layout/HalfNavBarLayout";
import { Header } from "../components/pages/EmailVerification";
import EmailVerificationPinCode from '../components/pages/EmailVerification/EmailVerificationPinCode';
import { useModal } from "../services/customHooks/useModal";

function EmailVerification() {
    

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            emailCode:"",
        },
        resolver: joiResolver(
            Joi.object({
                emailCode: Joi.string().required().min(4).max(4).label("Email Code"),
            })
        ),
    });

   
    const { openModalFunc } = useModal(
        "EmailVerificationSuccessModal",
        false,
     
    );

    const onSubmit = handleSubmit((data) => {
        
       openModalFunc();
    });

    return (
        <HalfNavBarLayout>
            <>
                <Header />

                {/* Text field and Resend section */}

                <form onSubmit={onSubmit}>
                    <div className="pt-10 md:pt-20 w-full md:w-1/2 space-y-6">
                        <div>
                            <Controller
                                name="emailCode"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <EmailVerificationPinCode value={value} onChange={onChange}/>
                                    );
                                }}
                            />

                            <p className="error1 mt-1">
                                {errors.emailCode?.message}
                            </p>
                        </div>

                        <h6>
                            Didn't get code?{" "}
                            <Link className="text-primaryColor" to={"/"}>
                                Resend Code
                            </Link>
                        </h6>
                    </div>

                    {/* button */}
                    <div className="w-full pt-20">
                        <button
                            type="submit"
                            className="w-1/2 btn1"
                            onClick={()=>{}}
                           
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </>
        </HalfNavBarLayout>
    );
}

export default EmailVerification;
