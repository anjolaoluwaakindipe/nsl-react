import { HTMLInputTypeAttribute } from "react";

// Form Information
// Loan Application Form
type LoanApplicationFormInfo = {
    amount: string;
    tenor: { value: string; label: string };
    interest: string;
    purpose: string;
    termsAndCondition: boolean;
};

type PersonalDetailsFormInfo = {
    fullname: string;
    emailAddress: string;
    phoneNumber: string;
    gender: { value: string; label: string } | Record;
    dateOfBirth: string;
    maritalStatus: { value: string; label: string } | Record;
    cscsNumber: string;
    residentialAddress: string;
    picture: FileList;
    proofOfIdentification: FileList;
    proofOfResidence: FileList;
    salarySlips: FileList;
};

type EditPersonalDetailsInfo = {
    fullname: string;
    emailAddress: string;
    phoneNumber: string;
    gender: { value: string; label: string } | Record;
    dateOfBirth: string;
    maritalStatus: { value: string; label: string } | Record;
    cscsNumber: string;
    residentialAddress: string;
    picture: FileList;
    proofOfIdentification: FileList;
    proofOfResidence: FileList;
    salarySlips: FileList;
};

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
    type?: HTMLInputTypeAttribute;
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
    intrest?: string;
    narration?: string;
};

// state
// modal state
interface ModalState {
    isOpen: boolean;
    isCancellable: boolean;
    // callBack: () => void | undefined;
    modalName: string;
}

// auth state
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: {
        sub: string;
        email_verified: boolean;
        name: string;
        preferred_username: string;
        given_name: string;
        family_name: string;
        email: string;
        phoneNumber:string;
    } | null;

    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    errorMessage: string;
    requestStatus: number;
}

// signUpInfo state
interface SignUpInfoState {
    fullName:string;
    email: string;
    phoneNumber: string;
    password: string;
    emailCode:string;
    smsCode:string;
}

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
