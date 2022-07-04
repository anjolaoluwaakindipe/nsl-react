import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBarLayout from "../components/layout/NavBarLayout";
import AccountDetailsSummaryInfo from "../components/pages/Summary/AccountDetailsInfo";
import EmploymentDetailsSummaryInfo from "../components/pages/Summary/EmploymentDetailsInfo";
import PersonalDetailsSummaryInfo from "../components/pages/Summary/PersonalDetailsInfo";
import SummaryHeader from "../components/pages/Summary/SummaryHeader";
import UploadSummaryInfo from "../components/pages/Summary/UploadInfo";
import { authSelector, submitUserInfoToNslDb } from "../state/authSlice";
import { paths } from '../utils/constants/allPaths';
import { AppDispatch } from '../state/store';

function Summary() {
    const { user } = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const submitApplication = async () => {
        dispatch(
            submitUserInfoToNslDb({
                allUserInfo: {
                    bvn: user?.bvn!,
                    firstName: user?.firstName!,
                    lastName: user?.lastName!,
                    cscsNumber: user?.cscsNumber!,
                    email: user?.email!,
                    gender: user?.gender!,
                    dateOfBirth: user?.dateOfBirth!,
                    customerNo: user?.customerNo!,
                    middleName: user?.middleName!,
                    phoneNumber: user?.phoneNumber!,
                    residentialAddress: user?.residentialAddress!,
                    maritalStatus: user?.maritalStatus!,
                    identificationDocExpiryDate:
                        user?.identificationDocExpiryDate!,
                    identificationDocRef: user?.identificationDocRef!,
                    identificationDocType: user?.identificationDocType!,
                    identificationIssueDate: user?.identificationIssueDate!,
                    identificationDocumentImage:
                        user?.identificationDocumentImage!,
                    proofOfAddressImage: user?.proofOfAddressImage!,
                    // picture: user?.picture!,
                    companyName: user?.employmentInfo.companyName!,
                    companyAddress: user?.employmentInfo.companyAddress!,
                    companyEmail: user?.employmentInfo.companyEmail!,
                    companyPhoneNumber:
                        user?.employmentInfo.companyPhoneNumber!,
                    grossIncome: user?.employmentInfo.grossIncome!,
                    jobTitle: user?.employmentInfo.jobTitle!,
                    natureOfBusiness: user?.employmentInfo.natureOfBusiness!,
                },
                cb: navigateToDashboard,
            })
        );
    };

    const navigateToDashboard = () =>{
        navigate(paths.USER_DASHBOARD)
    }
    return (
        <NavBarLayout>
            <div className="bg-bgColor2 w-full min-h-screen py-10">
                <h1 className="md:max-w-5xl bg-white rounded-3xl mx-5 lg:mx-auto text-center text-sm md:text-lg p-5 mb-8 font-light text-primaryColor">
                    Please, carefully go through your profile summary. You will
                    not be allowed to change any information until your profile
                    as been verified!!!
                </h1>
                <div className="md:max-w-6xl bg-white rounded-tl-3xl pb-10 mx-5  lg:mx-auto   max-w-none flex flex-col">
                    {/* Header */}
                    <SummaryHeader />

                    {/* Body */}
                    <div className="w-full mt-48 grid grid-cols-1 grid-flow-row-dense px-5  md:px-16 gap-10">
                        <PersonalDetailsSummaryInfo />
                        <EmploymentDetailsSummaryInfo />
                        <AccountDetailsSummaryInfo />
                        <UploadSummaryInfo />

                        <div className="w-full  flex justify-end py-5">
                            <button className="btn1 md:w-52 w-full" onClick={submitApplication}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </NavBarLayout>
    );
}

export default Summary;
