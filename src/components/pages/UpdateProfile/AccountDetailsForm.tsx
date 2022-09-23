import React, { useEffect } from "react";
import Progress from "./Progress";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { paths } from "../../../utils/constants/allPaths";
import { BASE_URL } from "../../../services/requests/authSettings";
import { useModal } from "../../../services/customHooks/useModal";
import FloatingPlaceholderTextField from "../../shared/Inputs/TextFields/FloatingPlaceholderTextField";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/redux/authSlice";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import axios from "axios";
import toast from "react-hot-toast";

function AccountDetailsForm() {
    const navigate = useNavigate();

    // const [numberOfAccounts, setNumberOfAccounts] = useState(1);
    // const {

    //     formState: { errors },
    // } = useForm({});

    // const [modalName, setModalName] = useState("")

    // const { openModalFunc } = useModal(modalName, false);

    // const onSubmitForm = handleSubmit((data) => {
    //     openModalFunc();
    // });

    // const addAccountInfo = () => {
    //     if (numberOfAccounts > 2) {
    //         return;
    //     }
    //     setNumberOfAccounts(numberOfAccounts + 1);
    // };

    // const oneChar = numberOfAccounts > 1 ? "1" : "";

    // const preventChar = (e: any) => { };

    const { email, firstName, lastName, middleName, phoneNumber } =
        useSelector(authSelector).user!;
    const publicKey = "pk_test_fc2bedce5657a08802e2afcd508ef4083d6b5452";
    const secretKey = "sk_test_dc69b7578ef52aac1712ac353d04b871b4c6ca8a";
    const text = "Add Card";

   

    const config: PaystackProps = {
        reference: new Date().getTime().toString(),
        email: email!,
        amount: 5000,
        publicKey: publicKey,
        firstname: firstName!,
        lastname: lastName!,
        phone: phoneNumber!,
        channels: ["card"],
        bearer: "account",
        currency: "NGN",
        label: "NSL 24",
        "data-custom-button": "Add Card",
    };

    const getUserCardInfo = async (reference: string) => {
        return await axios
            .get("https://api.paystack.co/transaction/verify/" + reference, {
                headers: { Authorization: "Bearer " + secretKey },
            })
            .then((res) => console.log(res.data));
    };

    const onSuccess = (reference: any) => {
        console.log(reference);
        getUserCardInfo(reference.reference)
            .then(() => navigate(paths.SUMMARY))
            .catch(() =>
                toast.error(
                    "Something went wrong while verifiying your card. Please try again later."
                )
            );
    };
    const onClose = () => {
        console.log("close");
    };

    const initializePayment = usePaystackPayment(config);

    return (
        <div>
            <div className="flex justify-between items-center pt-10 pb-5 border-b-2 border-gray-200">
                <h4 className="text-accentColor ">Account Details</h4>
                <Progress />
            </div>

            <form
                className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
                autoComplete="off"
                autoSave="off"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="col-span-12 w-full ">
                    You are required to provide your card details to update your
                    profile. A charge of N50.00 wil be debited from your account
                    as your registration fee and in order to verify your card.You can provide more than one
                    card details later.
                </div>

                <div className="col-span-12 ">
                    {/* <button
                        className="btn1 "
                        // onClick={()=>{openModalFunc("CardDetailsModal")}}
                    >
                        <AiFillPlusCircle />
                        <span>Add Card</span>
                    </button> */}
                </div>

                <div className="col-span-12 flex justify-between space-x-10">
                    <button
                        className={`btn1 bg-transparent border-2 hover:bg-transparent border-primaryColor text-primaryColor  w-full md:w-48`}
                        onClick={() => navigate(-1)}
                    >
                        Previous
                    </button>

                    <button
                        className={`btn1 bg-primaryColor text-white  flex items-center space-x-2  w-full md:w-48`}
                        onClick={() => {
                            console.log("hello");
                            initializePayment(onSuccess, onClose);
                        }}
                    >
                        <AiFillPlusCircle />
                        <span>Add Card</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountDetailsForm;

//   {/* account name*/}
//   <div className=" col-span-12 md:col-span-6 ">
//   <FloatingPlaceholderTextField
//       placeholder={`Account Name ${oneChar}`}
//       type="text"
//       register={register("accountName1")}
//       registerName='Account Name'
//       id="UpdateProfile__accountName"
//       errorMessage={errors.accountName1?.message}
//   />
// </div>

// {/* account number*/}
// <div className="md:col-span-6 col-span-12 ">
//   <FloatingPlaceholderTextField
//       placeholder={`Account Number ${oneChar}`}
//       type="text"
//       register={register("accountNumber1")}
//       registerName='account Number'
//       id="UpdateProfile__accountNumber"
//       errorMessage={errors.accountNumber1?.message}

//   />
//   {/* {validationErrors.accountBank && (
//       <p className="text-xs text-red-900 ">
//           {validationErrors.accountBank}
//       </p>
//   )} */}

// </div>

// {/* account bank*/}
// <div className=" col-span-12 md:col-span-6 ">
//   <FloatingPlaceholderTextField
//       placeholder={`Account Bank ${oneChar}`}
//       type="text"
//       register={register("accountBank1")}
//       registerName='Account Name'
//       id="UpdateProfile__bankName"
//       errorMessage={errors.accountBank1?.message}
//   />
// </div>

// {/* bvn*/}
// <div className=" col-span-12 md:col-span-6 ">
//   <FloatingPlaceholderTextField
//       placeholder="BVN"
//       type="text"
//       register={register("bvn")}

//       id="UpdateProfile__BVN"
//       errorMessage={errors.BVN?.message}
//   />
// </div>

// {numberOfAccounts > 1 ? (
//   <>

//       {/* account name*/}
//       <div className=" col-span-12 md:col-span-6 ">
//           <FloatingPlaceholderTextField
//               placeholder="Account Name 2"
//               type="text"
//               register={register("accountName2")}
//               registerName='Account Name'
//               id="UpdateProfile__accountName"
//               errorMessage={errors.accountName2?.message}
//           />
//       </div>

//       {/* account number*/}
//       <div className="md:col-span-6 col-span-12 ">
//           <FloatingPlaceholderTextField
//               placeholder="Account Number 2"
//               type="text"
//               register={register("accountNumber2")}
//               registerName='account Number'
//               id="UpdateProfile__accountNumber"
//               errorMessage={errors.accountNumber2?.message}

//           />
//           {/* {validationErrors.accountBank && (
//       <p className="text-xs text-red-900 ">
//           {validationErrors.accountBank}
//       </p>
//   )} */}

//       </div>

//       {/* account bank*/}
//       <div className=" col-span-12 md:col-span-6 ">
//           <FloatingPlaceholderTextField
//               placeholder="Account Bank 2"
//               type="text"
//               register={register("accountBank2")}

//               id="UpdateProfile__bankName"
//               errorMessage={errors.accountBank2?.message}
//           />
//       </div>

//   </>
// ) : (
//   <div className="col-span-12 ">
//       <button
//           className="btn1 bg-primaryColor text-white w-full sm:w-max flex items-center space-x-2"
//           onClick={addAccountInfo}
//       >
//           <AiFillPlusCircle />
//           <span>Add Account Info</span>
//       </button>
//   </div>
// )}
