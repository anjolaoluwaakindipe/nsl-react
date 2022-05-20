import React from "react";

function PhoneEmailVerificationSuccessModal(prop: { callback: () => void }) {
    return (
        <div className="w-full flex flex-col items-center pt-20">
            <img
                src="assets/successtick.svg"
                alt="success_img"
                className="object-contain w-52"
            />
            <h3 className="pt-5 text-4xl font-bold text-primaryColor">
                Successful
            </h3>
            <h5 className="max-w-[600px] min-w-[400px] text-center text-2xl py-20">
                You have successfully verified your account proceed to go to
                your Dashboard
            </h5>

            <button className="btn1 w-96" onClick={prop.callback}>Proceed</button>
        </div>
    );
}

export default PhoneEmailVerificationSuccessModal;
