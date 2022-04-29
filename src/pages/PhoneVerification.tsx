import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SingleTextField from '../components/shared/TextFields/SingleTextField';
import DefaultLayout from '../components/layout/DefaultLayout';

// components
import {Header} from '../components/pages/PhoneVerification'



function PhoneVerification() {
    // component state
    const [verificationCodeText, setVerficationCodeText] = useState("");

    // s
    const verificationTextHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = (e) => {
        const text = e.target.value
        if (text.length < 7) {
            setVerficationCodeText(text);
        }

        console.log(verificationCodeText);
    };

    return (
        <DefaultLayout>
            <>
                <Header/>

                <div className="pt-20 w-full md:w-1/2 space-y-6">
                    <SingleTextField placeholder="Verification Code" onChange={verificationTextHandler} value={verificationCodeText}/>

                    <h6>
                        Didn't get code?{" "}
                        <Link className="text-accentColor" to={"/"}>
                            Resend
                        </Link>
                    </h6>
                </div>

                <div className="w-full pt-20">
                    <button className=" w-full md:w-1/2 btn1" onClick={() => {}}>
                        Verify
                    </button>
                </div>
            </>
        </DefaultLayout>
    );
}

export default PhoneVerification