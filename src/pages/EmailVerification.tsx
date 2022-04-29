import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";
import SingleTextField from "../components/shared/TextFields/SingleTextField";
import {Header} from '../components/pages/EmailVerification'

function EmailVerification() {
    // component state
    const [verificationCodeText, setVerficationCodeText] = useState("") 
    
    // handlers
    const verificationTextHandler:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        if(e.target.value.length< 7){
            setVerficationCodeText(e.target.value);
        }
        
        console.log(verificationCodeText)
    }

    return (
        <DefaultLayout>
            <>
                <Header/>

                {/* Text field and Resend section */}
                <div className="pt-20 w-full md:w-1/2 space-y-6">
                    <SingleTextField
                        placeholder="Verification Code"
                        onChange={verificationTextHandler}
                        value={verificationCodeText}
                    />

                    <h6>
                        Didn't get code?{" "}
                        <Link className="text-accentColor" to={"/"}>
                            Resend
                        </Link>
                    </h6>
                </div>

                {/* button */}
                <div className="w-full pt-20">
                    <button
                        className="w-1/2 btn1"
                        onClick={()=>{}}
                    >
                        Verify
                    </button>
                </div>
            </>
        </DefaultLayout>
    );
}  

export default EmailVerification;
