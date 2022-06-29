import React from "react";
import Webcam from "react-webcam";
import { BsFillCameraFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";

type WebCamInputProps = {
    errorMessage?: string;
    value?: string;
    onChange?: (...event: string[]) => void;
};

function WebCamInput({ value, onChange, errorMessage }: WebCamInputProps) {
    const [pictureValue, setPicutureValue] = useState("");

    const webcamRef: React.LegacyRef<Webcam> = React.useRef(null);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot!();
        if (imageSrc) {
            setPicutureValue(imageSrc.replace("data:", "").replace(/^.+,/, ""));
        }
        if (onChange && imageSrc) {
            onChange(imageSrc.replace("data:", "").replace(/^.+,/, ""));
        }
        setShowWebCam(false);
    }, [webcamRef]); // eslint-disable-line

    useEffect(() => {
        if (value) {
            setPicutureValue(value);
        }
    }, [value]);

    const [showWebCam, setShowWebCam] = useState(false);

    const videoConstraints = {
        facingMode: "user",
    };

    return (
        <>
            {showWebCam && (
                <div className="fixed top-0 left-0 z-10 w-full h-screen flex p-5 flex-col items-center justify-center bg-black bg-opacity-30">
                    <div className="absolute top-10 right-10 w-8 h-8 flex justify-center items-center rounded-full bg-primaryColor cursor-pointer">
                        <AiOutlineClose
                            className="text-2xl text-white  "
                            onClick={() => setShowWebCam(false)}
                        />
                    </div>

                    <div className="max-w-2xl p-4 text-left absolute top-8 bg-white   text-primaryColor rounded-lg space-y-4">
                        <h1>
                            Please know that your picture will be used in making
                            a decision for your loan application.
                        </h1>
                        <h1>
                            <span className="font-bold"> Note: </span>
                            Make sure there is sufficient lighting when taking
                            your picture!
                        </h1>
                    </div>
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        mirrored
                        screenshotFormat="image/png"
                        className=" md:w-[600px] md:h-[600px}"
                        videoConstraints={videoConstraints}
                    />
                    <button
                        className="btn1 mt-10 rounded-full flex"
                        onClick={capture}
                    >
                        <div>
                            <BsFillCameraFill className=" text-2xl mr-2" />
                        </div>
                        <h1>Capture photo</h1>
                    </button>
                </div>
            )}

            <div className="w-full">
                {pictureValue && (
                    <img
                        src={"data:image/jpg;base64," + pictureValue}
                        alt="photo_Image"
                        className="w-full self-center mb-5"
                    />
                )}
                <button
                    className="w-full bg-primaryColor text-secondaryColor py-5 rounded-md  flex justify-center items-center"
                    onClick={() => setShowWebCam(true)}
                >
                    <div>
                        <BsFillCameraFill className=" text-2xl mr-2" />
                    </div>
                    <h1>Capture photo</h1>
                </button>
                <div className="text-xs text-red-900 pt-2 w-full flex justify-center ">
                    {errorMessage}
                </div>
            </div>
        </>
    );
}

export default WebCamInput;
