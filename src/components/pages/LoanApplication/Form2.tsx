import React from "react";
import {
    UseFormRegister,
    FieldErrors,
    UseFormHandleSubmit,
    UseFormWatch,
} from "react-hook-form";
import { LoanApplicationFormInfo } from "../../../typings";

// icons
import { AiOutlineCloudUpload } from "react-icons/ai";
import {BsCheck2} from "react-icons/bs"

type LoanApplicationForm2Props = {
    register: UseFormRegister<LoanApplicationFormInfo>;
    errors?: FieldErrors<LoanApplicationFormInfo>;

    handleSubmit: UseFormHandleSubmit<LoanApplicationFormInfo>;

    watch: UseFormWatch<LoanApplicationFormInfo>;
};

function Form2({ register, handleSubmit, watch }: LoanApplicationForm2Props) {
    const watchTermsAndCond = watch("termsAndCondition");
    const watchPassportUpload = watch("passport");
    const watchproofOfIdentification = watch("proofOfIdentification");
    const watchproofOfResidence = watch("proofOfResidence");
    const watchSalarySlips = watch("salarySlips");

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    return (
        <>
            {SubInfo()}
            <form
                className="w-full py-20 space-y-16  text-darkTextColor"
                onSubmit={onSubmit}
            >
                <div>
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="LoanApplication__passport"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchPassportUpload &&
                            watchPassportUpload?.length > 0
                                ? watchPassportUpload.item(0)?.name
                                : "Upload Passport"}
                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("passport")}
                            id="LoanApplication__passport"
                            className="outline-none pb-4 hidden"
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>
                <div>
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="LoanApplication__proofOfIdentification"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchproofOfIdentification &&
                            watchproofOfIdentification?.length > 0
                                ? watchproofOfIdentification.item(0)?.name
                                : "Proof of Identification"}

                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("proofOfIdentification")}
                            id="LoanApplication__proofOfIdentification"
                            className="outline-none pb-4 hidden"
                            
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>
                <div>
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="LoanApplication__proofOfResidence"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchproofOfResidence &&
                            watchproofOfResidence?.length > 0
                                ? watchproofOfResidence.item(0)?.name
                                : "Proof of Residence"}

                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("proofOfResidence")}
                            id="LoanApplication__proofOfResidence"
                            className="outline-none pb-4 hidden"
                            
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>
                <div>
                    <div className=" border-0 border-b-2 border-underlineColor">
                        <label
                            htmlFor="LoanApplication__salarySlips"
                            className={
                                "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                            }
                        >
                            {watchSalarySlips && watchSalarySlips?.length > 0
                                ? watchSalarySlips.item(0)?.name
                                : "Original/certified copy of the latest salary slips for the past 3 months"}

                            <AiOutlineCloudUpload
                                className="text-2xl"
                                strokeWidth={50}
                            />
                        </label>
                        <input
                            type="file"
                            {...register("salarySlips")}
                            id="LoanApplication__salarySlips"
                            className="outline-none pb-4 hidden"
                           
                            accept=".pdf"
                        />
                    </div>
                    {<p className="text-xs text-red-900 ">{""}</p>}
                </div>

                <div className="flex items-center space-x-3">
                    <label htmlFor="LoanApplication__termsAndCondition">
                        <div
                            className={` border-2 rounded-sm border-primaryColor w-5 h-5 items-center justify-center`}
                        >
                            {watchTermsAndCond ? (
                                <BsCheck2 strokeWidth={0.7} />
                            ) : (
                                ""
                            )}
                        </div>
                    </label>
                    <span>I agree to the Terms and Conditions</span>
                    <input
                        type="checkbox"
                        id="LoanApplication__termsAndCondition"
                        className="hidden"
                        {...register("termsAndCondition")}
                    />
                </div>

                <button
                    className={`w-full md:w-1/2 btn1 bg-darkTextColor `}
                    type="submit"
                >
                    Proceed
                </button>
            </form>
        </>
    );

    function SubInfo() {
        return (
            <div className="pt-5">
                <h4 className="heading-info1 font-light leading-6 text-justify">
                    You will be given a loan of N500,000 and will be required to
                    pay the principle and interest of 15% in the next 30days to
                    90days. The following documents below needs to be uploaded.
                    Proof of Identification includes international passport,
                    driver’s license, national identity card, e.t.c.
                </h4>
            </div>
        );
    }
}

export default Form2;
