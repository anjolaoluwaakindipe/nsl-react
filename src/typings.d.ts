import { HTMLInputTypeAttribute } from "react";
import keycloak from "./services/keycloak/keycloak";

// All modal names

type ModalNames =
    | "PhoneEmailVerificationSuccessModal"
    | "EmailVerificationSuccessModal"
    | "AccountCreatedSucessModal"
    | "LoginSucessModal"
    | "LoginUnsucessfulModal"
    | "ProfileUpdateModal"
    | "BeginVerificationModal"
    | "ProfileUpdateSuccessfulModal"
    | "LoanApplicationSucessModal"
    | "LogOutModal"
    | "CardDetailsModal"
    | "ProfileSuccessfullySubmitted"
    | "PhoneVerificationSuccessModal"
    | "SignLoanContractModal"
    | "AddCardModal"
    | "DeleteCardModal"
    | "";

// Form Information
// Loan Application Form
type LoanApplicationFormInfo = {
    amount: string;
    tenor: { value: string; label: string };
    interest: string;
    purpose: string;
    repaymentAmount: string;
    repaymentDate: string;
    termsAndCondition: boolean;
    picture: string;
    disbursementAccountName: string;
    disbursementNUBAN: string;
    disbursementBankInfo: {
        disbursementBankCode: string;
        disbursementBankName: string;
    };
};

// Update Personal Details Form
type PersonalDetailsFormInfo = {
    firstName: string;
    lastName: string;
    title: string;
    middleName: string;
    emailAddress: string;
    phoneNumber: string;
    gender: { value: string; label: string };
    dateOfBirth: string;
    IdissueDate: string;
    IdexpiryDate: string;
    maritalStatus: { value: string; label: string };
    cscsNumber: string;
    residentialAddress: string;
    picture: string | null;
    proofOfIdentification: string | null;
    proofOfResidence: string | null;
    salarySlips: string | null;
    bvn: string;
    documentType: { value: string; label: string };
    documentRefNumber: string;
};

// Update Employment Details Form
type EmploymentDetailsFormInfo = {
    jobTitle: string;
    companyName: string;
    natureOfBusiness: string;
    companyPhoneNumber: string;
    companyEmailAddress: string;
    grossIncome: string;
    companyAddress: string;
};

// Sign Up Form
type CreateAccountFormData = {
    // cscsAccountNumber: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    bvn: string;
    password: string;
    dateOfBirth: string;
    gender: { value: string; label: string };
    confirmPassword: string;
};

// edit personal information form
type EditPersonalDetailsInfo = {
    firstName: string;
    lastName: string;
    title: string;
    middleName: string;
    emailAddress: string;
    phoneNumber: string;
    gender: { value: string; label: string };
    dateOfBirth: string;
    maritalStatus: { value: string; label: string };
    cscsNumber: string;
    residentialAddress: string;
    bvn: string;
};

// edit employment information form
type EditEmploymentInfo = {
    jobTitle: string;
    companyName: string;
    natureOfBusiness: string;
    companyPhoneNumber: string;
    companyEmailAddress: string;
    grossIncome: string;
    companyAddress: string;
};

type EditUploadsInfo = {
    IdissueDate: string;
    IdexpiryDate: string;
    picture: string | null;
    proofOfIdentification: string | null;
    proofOfResidence: string | null;
    documentType: { value: string; label: string };
    documentRefNumber: string;
};

// Login Form
type LoginInfo = {
    usernameOrEmail: string;
    password: string;
};

/* Props */
// TextFields
// Single TexField
type SingleTextFieldProps = {
    id?: string;
    name?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    label?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    maxLength?: number;
};

/* Validation Error Types */
// Loan Application
type LoanApplicationValidationErrors = {
    amount?: string;
    tenor?: Record<string, any> | undefined;
    interest?: string;
    repaymentAmount?: string;
    repaymentDate?: string;
    narration?: string;
};

// state
// modal state
interface ModalState {
    isOpen: boolean;
    isCancellable: boolean;
    // callBack: () => void | undefined;
    modalName: ModalNames;
}

// auth state
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: {
        title: string | null;
        rfid: string | null;
        rfStatus: "Processed" | "New" | "Draft" | "" | null;
        keycloakId: string | null;
        customerNo: string | null;
        name: string | null;
        firstName: string | null;
        lastName: string | null;
        middleName: string | null;
        maritalStatus: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        phoneNumber: string | null;
        email: string | null;
        bvn: string | null;
        residentialAddress: string | null;
        cscsNumber: string | null;
        identificationDocType?: string | null;
        identificationDocRef?: string | null;
        identificationIssueDate?: string | null;
        identificationDocExpiryDate?: string | null;
        identificationDocumentImage?: string | null;
        proofOfAddressImage?: string | null;
        picture?: string | null;
        employmentInfo: {
            jobTitle: string | null;
            natureOfBusiness: string | null;
            companyName: string | null;
            companyPhoneNumber: string | null;
            companyEmail: string | null;
            companyAddress: string | null;
            grossIncome: string | null;
        };
    } | null;

    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    errorMessage: string;
    requestStatus: number;
}

// signUpInfo state
interface SignUpInfoState {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: { value: string; label: string } | undefined;
    email: string;
    bvn: string;
    phoneNumber: string;
    password: string;
    emailCode: string;
    smsCode: string;
}

// loan state
export type SubmittedLoanApplication = {
    _id: string;
    applicationReference: string;
    customerNo: string;
    amount: string;
    emailAddress: string;
    applicantName: string;
    phoneNumber: string;
    rate: string;
    repaymentAmount: string;
    tenor: string;
    purpose: string;
    txnDate: string;
    loanProduct: "60";
    loanProductName: "TERM LOANS";
    loanProductClass: "L";
    statusComments: string;
    processingStatus: string;
    statusCode:
        | string
        | "AWAITINGCUSTOMERAGREEMENT"
        | "AWAITINGLOANAGREEMENT"
        | "DISBURSED";
    status: string;
};

export type DisbursedLoan = {
    branch: string;
    primaryAccountNo: string;
    accountNo: string;
    altAccountNo: string;
    accountTitle: string;
    customerNo: string;
    customerName: string;
    accountName: string;
    productCode: string;
    product: string;
    productClass: string;
    productClassDescription: string;
    ledgerCode: string;
    ledger: string;
    controlAccount: null;
    ccy: "NGN";
    ccyCode: "NGN";
    ccyName: "Nigeria Naira";
    dateOpened: string;
    periodOpened: number;
    dealno: string;
    lapno: string;
    lendingModel: "WEB";
    loanPurpose: "60";
    loanAmount: number;
    bookDate: string;
    loanDate: string;
    lastMovementDate: string;
    availableBalance: number;
    clearedBalance: number;
    bookBalance: number;
    lccyAvailableBalance: number;
    lccyClearedBalance: number;
    lccyBookBalance: number;
    accruedCOT: number;
    lastCOTAccrualDate: null;
    accruedCRInt: number;
    lastCRIntAccrualDate: null;
    limitChecktype: string;
    accountLimit: number;
    limitEffDate: string;
    limitExpDate: string;
    useDRBaseRate: boolean;
    drBaseRateCode: null;
    drBaseRate: null;
    drMarginOverBaseRate: null;
    drFixedRate: number;
    lastDRRateChange: null;
    minimumDRInterestRate: null;
    maximumDRInterestRate: null;
    minimumDRInterestAmount: null;
    maximumDRInterestAmount: null;
    drInterestRate: number;
    drEffectiveYield: number;
    drInterestBaseDays: null;
    drInterestFreq: null;
    drInterestApplicationMethod: null;
    automaticRepaymentProcessing: true;
    noofInstalments: number;
    repaymentFrequency: "M";
    dueOn: string;
    repaymentStartDate: string;
    repaymentAccountNo: string;
    loanServicingAccountNo: string;
    loanServicingBank: null;
    loanServicingMode: null;
    repaymentSchedule: any[];
    lastDRInt: number;
    lastDRIntDate: null;
    accruedDRInt: number;
    lastDRIntAccrualDate: null;
    active: boolean;
    blockedforPostings: boolean;
    status: "A";
};


type LoanState = {
    loanApplicationList: SubmittedLoanApplication[] | null;
    selectedLoanApplication: SubmittedLoanApplication | null;
    disbursedLoanList: DisbursedLoan[] | null;
    selectedDisbursedLoan: DisbursedLoan | null;
};

// card state
type CardInfo = {
    accountNo: string;
    authorizationCode: string;
    authorizationData: {
        authorization_code: string;
        bin: string;
        last4: string;
        exp_month: string;
        exp_year: string;
        channel: string;
        card_type: string;
        bank: string;
        country_code: string;
        brand: string;
        reusable: boolean;
        signature: string;
        account_name: string | null;
        receiver_bank_account_number: string | null;
        receiver_bank: string | null;
    };
    cardType: string;
    customerNo: string;
    defaultCard: boolean;
    gateway: string;
    id: number;
    loanRef: string;
    panLast4: string;
    panLast6: string;
};

type CardState = {
    cardList: CardInfo[] | null;
    isError: boolean;
    isLoading: boolean;
    selectedCard: CardInfo | null;
};

// Requests
interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
}

interface UserResponse {
    sub: string;
    email_verified: boolean;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

interface UserInfoAppResponse {
    customerNo: string | null;
    name: string | null;
    firstName: string | null;
    lastName: string | null;
    otherName: string | null;
    maritalStatus: string | null;
    dob: string | null;
    gender: string | null;
    phoneRef: string | null;
    email: string | null;
    bvn: string | null;
    address: string | null;
    memberShipNo: string | null /* cscsNumber */;
    // employment Info
    employmentStatus: string | null /* company name*/;
    occupationDesc: string | null /* Job title*/;
    employerAddress: string | null;
    officeEmail: string | null;
    officePhoneNo: string | null;
    grossAnnualIncome: number | null;
    natureOfBuss: string | null /* nature of business*/;
    // documents
    kycdocs: [
        ProofOfIdentificationFromGetUserAppResponse,
        ProofOfAddressFromGetUserAppResponse,
        PictureFromGetUserAppResponse
    ];
}

type ProofOfIdentificationFromGetUserAppResponse = {
    documentType: string | null;
    documentReference: string | null;
    documentIssueDate: string | null;
    documentExpiryDate: string | null;
    documentImage: string | null;
};

type ProofOfAddressFromGetUserAppResponse = {
    documentType: "Proof of Address";
    documentImage: string | null;
};

type PictureFromGetUserAppResponse = {
    documentType: "Photo";
    documentImage: string | null;
};

type GetCardsInfoResponse = CardInfo[];
