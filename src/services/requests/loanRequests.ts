import axios from "axios";

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
        rate: string;
        repaymentAmount: string;
        tenor: string;
        emailAddress: string;
        purpose: string;
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
                timeout: 1000,
            })
            .then((data) => {
                res.data = data.data;
                res.status = data.status;
                console.log(res.data?.data);
                return res;
            })
            .catch((err) => {
                console.log(err);
                if (err.code !== "ECONNABORTED") {
                    res.status = err.response.status;
                }
                res.code = err.code;
                console.log(res);
                return res;
            });
    },
};

// async function doWork() {
//     await loanRequests.getPortforlioInfo();
// }
// doWork();
