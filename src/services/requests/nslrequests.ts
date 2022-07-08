import axios from "axios";
export const nslRequests = {
    submitCompletedCustomerAccount: async ({
        customerNo,
        firstName,
        lastName,
        middleName,
        maritalStatus,
        dateOfBirth,
        gender,
        phoneNumber,
        email,
        bvn,
        residentialAddress,
        cscsNumber,
        identificationDocType,
        identificationDocRef,
        identificationIssueDate,
        identificationDocExpiryDate,
        identificationDocumentImage,
        proofOfAddressImage,
        picture,
        jobTitle,
        natureOfBusiness,
        companyName,
        companyPhoneNumber,
        companyEmail,
        companyAddress,
        grossIncome,
    }: {
        customerNo: string | null;
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
        jobTitle: string | null;
        natureOfBusiness: string | null;
        companyName: string | null;
        companyPhoneNumber: string | null;
        companyEmail: string | null;
        companyAddress: string | null;
        grossIncome: string | null;
    }) => {
        // response data format
        const res: {
            status: null | number;
            data: Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        const body = {
            customerNo: customerNo,
            firstname: firstName,
            surname: lastName,
            middlename: middleName,
            gender: gender,
            maritalStatus: maritalStatus,
            dateOfBirth: dateOfBirth,
            email: email,
            bvn: bvn,
            mobileNo: phoneNumber,
            cscsno: cscsNumber,
            ResidentialAddress: residentialAddress,
            idDocType: identificationDocType,
            idDocRef: identificationDocRef,
            idIssueDate: identificationIssueDate,
            idDocExpiryDate: identificationDocExpiryDate,
            idDocumentImage: identificationDocumentImage,
            proofOfAddressImage: proofOfAddressImage,
            photo: picture,
            jobtitle: jobTitle,
            natureofbusiness: natureOfBusiness,
            employername: companyName,
            employerphone: companyPhoneNumber,
            employeremail: companyEmail,
            employeraddress: companyAddress,
            grossIncome: grossIncome,
        };
        return await axios
            .post("/isslapi/ibank/api/v1/newcustomer", body, {
                headers: {
                    "Content-Type": "application/json",
                    "X-TENANTID": "islandbankpoc",
                },
            })
            .then((response) => {
                console.log(response);
                console.log("Success");
                res.status = response.status;
                res.data = (response.data as {signUpOK:boolean, statusCode:number, statusMessage:string, requestId:string,});
                return res;
            })
            .catch((err) => {
                console.log(err);
                console.log("Error");
                res.status = err.response.status;
                res.code = err.response.code;
                return res;
            });
    },
};


// async function doWork(){
//    return await nslRequests.submitCompletedCustomerAccount({
// customerNo:"009298",
// firstName:"Anjola",
// lastName:"Adele",
// middleName:"Daniel",
// maritalStatus:"Single",
// dateOfBirth:"2000-01-04",
// gender:"F",
// phoneNumber:"+2347030444529",
// email:"femi.adele@cflng.com",
// bvn:"12462739971",
// residentialAddress:"No 2 Mawamiwale Street, NowhereVille, Eko I",
// cscsNumber:"2341341324",
// identificationDocType:"Drivers License",
// identificationDocRef:"hello/123/23",
// identificationIssueDate:"2000-12-07",
// identificationDocExpiryDate:"2024-12-03",
// jobTitle:"Senior Manager",
// natureOfBusiness:"Software Development",
// companyName:"ISSL",
// companyPhoneNumber:"+23470306547856",
// companyEmail:"bosses@enterprise.co",
// companyAddress:"29 Adigun Street",
// grossIncome:"20000",
// })
// }

// doWork()


