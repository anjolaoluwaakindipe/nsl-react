import axios, { AxiosError } from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { DisbursedLoan, SubmittedLoanApplication } from "../../typings";
import { X_TENANTID } from "./authSettings";

export const loanRequests = {
    async getLoanTenureRepaymentAndDate({
        amount,
        tenor,
    }: {
        amount: number;
        tenor: number;
    }) {
        const res: {
            status: number;
            code: string;
            data:
                | {
                      principal: number;
                      rate: number;
                      tenor: number;
                      interest: number;
                      repaymentAmount: number;
                      repaymentDueDate: string;
                  }
                | Record<string, any>;
        } = { status: 0, code: "", data: {} };

        return await axios
            .get("/isslapi/ibank/api/v1/getInstantLoanRepayment", {
                params: {
                    principal: amount,
                    tenor,
                },
            })
            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                return res;
            })
            .catch((err) => {
                res.code = err.response.code;
                res.status = err.response.status;
                return res;
            });
    },

    async submitLoanApplication(params: // repaymentAmount,
    {
        applicationReference: string;
        customerNo: string;
        amount: string;
        channel: string;
        applicantName: string;
        phoneNumber: string;
        interestRate: string;
        repaymentAmount: string;
        tenor: string;
        emailAddress: string;
        purpose: string;
        disbursementBankName: string;
        disbursementBankCode: string;
        disbursementAccountName: string;
        disbursementNUBAN: string;
        liveImage: string;
    }) {
        const res: {
            status: number;
            code: string;
            data:
                | {
                      applicationReference: string;
                      responseCode: string;
                      responseMessage: string;
                  }
                | Record<string, any>;
        } = { status: 0, code: "", data: {} };
        const body = {
            ...params,
            instantLoan: true,
            // repaymentAmount,
        };
        return await axios
            .post("/isslapi/ibank/api/v1/loanapplication", body, {
                headers: {
                    "Content-Type": "application/json",
                    "X-TENANTID": "islandbankpoc",
                },
            })
            .then((response) => {
                res.data = response.data;
                res.status = response.status;
                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.code;
                res.data = err.response.data;
                return res;
            });
    },
    async getPortforlioInfo() {
        const res: {
            status: number;
            code: string;
            data: { data: { portfolio: number }[] } | null;
        } = {
            status: 0,
            code: "",
            data: null,
        };

        return await axios
            .get("/isslapi/cscs-api/1.0/portfolioxbvn/1234566", {
                timeout: 500,
            })
            .then((data) => {
                res.data = data.data;
                res.status = data.status;
                return res;
            })
            .catch((err) => {
                if (err.code !== "ECONNABORTED") {
                    res.status = err.response.status;
                }
                res.code = err.code;
                return res;
            });
    },

    async getUserLoanApplications(customerNo: string) {
        const response = await axios.get<SubmittedLoanApplication[]>(
            "/isslapi/ibank/api/v1/getLoanApplicationsxCustomer?customerno=" +
                customerNo,
            {
                headers: {
                    "X-TENANTID": X_TENANTID,
                },
            }
        );
        return response.data;
    },

    async getALoanApplication(applicationReference: string) {
        const response = await axios.get<SubmittedLoanApplication>(
            "/isslapi/ibank/api/v1/getLoanApplicationxReference?applicationreference=" +
                applicationReference,
            {
                headers: {
                    "X-TENANTID": X_TENANTID,
                },
            }
        );

        return response.data;
    },

    async generateLoanContractOtp(applicationreference: string) {
        const res: {
            status: number;
            code: string;
            data: string | null;
        } = {
            status: 0,
            code: "",
            data: null,
        };

        await axios
            .get(
                "/isslapi/ibank/api/v1/generateotp?userId=loancontract" +
                    applicationreference
            )
            .then((data) => {
                res.status = data.status;
                res.data = data.data;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.code;
            });

        return res;
    },

    async getLoanContractOtp(applicationreference: string) {
        const res: {
            status: number;
            code: string;
            data: number | null;
        } = {
            status: 0,
            code: "",
            data: null,
        };
        return await axios
            .get(
                "/isslapi/ibank/api/v1/getotp?userId=loancontract" +
                    applicationreference
            )
            .then((data) => {
                res.status = data.status;
                res.data = data.data;
                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.code;
                return res;
            });
    },

    async signLoanContract({
        applicationReference,
        fullName,
        customerNo,
    }: {
        applicationReference: string;
        fullName: string;
        customerNo: string;
    }) {
        const res: {
            status: number;
            code: string;
            data: {
                resourceId: string;
                responseCode: string;
                responseMessage: string;
            } | null;
        } = {
            status: 0,
            code: "",
            data: null,
        };

        const ipAddressResponse = await axios.get(
            "https://api.ipify.org?format=json"
        );

        if (ipAddressResponse.status !== 200) return res;

        const body = {
            actionDate: new Date().toISOString().split(".")[0],
            actionFlds: "",
            actionType: "SendforDisbursement",
            applicationReference: applicationReference,
            comment: "",
            user: {
                fullName: fullName,
                ipAddress: ipAddressResponse.data.ip,
                screenName: customerNo,
            },
        };

        return await axios
            .post("/isslapi/ibank/api/v1/loanapplicationaction", body, {
                headers: { "X-TENANTID": X_TENANTID },
            })
            .then((data) => {
                res.status = data.status;
                res.data = data.data;
                return res;
            })
            .catch((err) => {
                res.status = err.response.status;
                res.code = err.code;
                return res;
            });
    },

    async getAllBanksWithTheirCodes() {
        return await axios
            .get("/isslapi/ibank/api/v1/getAllBanks", {
                headers: { "X-TENANTID": X_TENANTID },
            })
            .then((res) => res.data as { name: string; code: string }[]);
    },

    async getAccountName({
        bankcode,
        accountNumber,
    }: {
        bankcode: string;
        accountNumber: string;
    }) {
        return await axios
            .get("/isslapi/ibank/api/v1/accountNameLookup", {
                params: {
                    bankcode: bankcode,
                    nuban: accountNumber,
                },
            })
            .then((res) => res.data as { account_name: string | null });
    },

    async getUserDisbursedLoans(customerNo: string) {
        const response = await axios.get<DisbursedLoan[]>(
            "/isslapi/ibank/api/v1/getCustomerLoans",
            {
                params: {
                    customerno: customerNo,
                },
                headers: {
                    "X-TENANTID": X_TENANTID,
                },
            }
        );

        return response.data;
    },

    async loanRepayment(
        amount: number,
        contraparty: "Paystack",
        loanRef: string,
        repaymentMode: "Card",
        fullName: string,
        paymentReference: string,
        customerNo: string
    ) {
        const res: {
            status: number;
            data:
                | {
                      postedOK: boolean;
                      statusCode: string;
                      statusMessage: string;
                  }
                | Record<string, any>;
            code: string;
        } = {
            status: 0,
            data: {},
            code: "",
        };
        const ipAddressResponse = await axios.get(
            "https://api.ipify.org?format=json"
        );

        if (ipAddressResponse.status !== 200) return res;
        const requestTime = new Date().toISOString();

        const body: {
            amount: number;
            contraparty: "Paystack";
            loanRef: string;
            ownNarrative: string;
            reference: string;
            repaymentMode: "Card";
            txndate: string;
            user: {
                fullName: string;
                ipAddress: string;
                screenName: string;
            };
            valuedate: string;
        } = {
            amount: amount,
            contraparty: contraparty,
            loanRef: loanRef,
            ownNarrative: "loan repayment via paystack",
            reference: paymentReference,
            repaymentMode: repaymentMode,
            txndate: requestTime,
            user: {
                fullName: fullName,
                ipAddress: ipAddressResponse.data.ip,
                screenName: customerNo,
            },
            valuedate: requestTime,
        };

        return await axios
            .post("/isslapi/ibank/api/v1/cfl/Payment2Collections", body, {
                headers: { "X-TENANTID": X_TENANTID },
            })
            .then((response) => {
                res.data = response.data;
                res.status = response.status;
                console.log(response);
                return res;
            })
            .catch((err) => {
                const requestError = err as unknown as AxiosError;
                res.status = requestError.response?.status!;
                res.code = requestError.code!;
                return res;
            });
    },

    async getLoanTransactionHistory(accountNo: string, todate: string) {
        const res: {
            status: number;
            data:
                | {
                      content: {
                          id: number;
                          channel: string;
                          postDate: string;
                          narrative: string;
                          reference: string;
                          valueDate: string;
                          amount: number;
                          balanceCF: number;
                          ccy: string;
                      }[];
                  }
                | Record<string, any>;
            code: string;
        } = { status: 0, data: {}, code: "" };

        return await axios
            .get("/isslapi/ibank/api/v1/getAccountTransactionsPaged", {
                params: {
                    accountno: accountNo,
                    fromdate: "19500201",
                    todate: todate,
                    page: "0",
                    size: "50",
                    sort: "ascending",
                },
            })
            .then((response) => {
                res.status = response.status;
                res.data = response.data;
                return res;
            })
            .catch((err) => {
                const errRes = err as unknown as AxiosError;
                res.status = errRes.response?.status!;
                res.code = errRes.code!;

                return res;
            });
    },
};

// async function doWork() {
//     await loanRequests.signLoanContract({applicationReference:"1", customerNo: "2", fullName: "33"});
// }
// doWork();
