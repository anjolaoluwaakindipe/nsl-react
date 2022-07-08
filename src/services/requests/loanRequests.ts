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

    async submitLoanApplication({
        customerNo,
        amountNeeded,
        channel
    }: // repaymentAmount,
    {
        customerNo: string;
        amountNeeded: string;
        channel: string;
        // repaymentAmount: string;
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
            customerNo,
            amountNeeded,
            channel,
            // repaymentAmount,
        };
        return await axios
            .post(
                "/isslapi/ibank/api/v1/loanapplication",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-TENANTID": "islandbankpoc",
                    },
                }
            )
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
};

// async function doWork() {
//     const response = await loanRequests.submitLoanApplication({
//         customerNo: "0001",
//         amountNeeded: "700000",
//         channel:"web"
//         // repaymentAmount: "716333",
//     });
//     console.log(response);
// }
// doWork();
