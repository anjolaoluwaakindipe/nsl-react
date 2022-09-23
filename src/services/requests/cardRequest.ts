import axios from "axios";
import { GetCardsInfoResponse } from "../../typings";
import { X_TENANTID } from "./authSettings";
const cardRequest = {
    async addCard({
        authdata,
        customerNo,
        defaultcard,
        loanref,
    }: {
        authdata: string;
        customerNo: string;
        defaultcard: boolean;
        loanref: string;
    }) {
        const res: {
            status: number | null;
            data:
                | {
                      ok: boolean;
                      statusMessage: string;
                  }
                | Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        return await axios
            .post(
                "/isslapi/ibank/api/v1/addLoanRepaymentCardAuthorization?authdata=" +
                    authdata,
                "",
                {
                    params: {
                        customerno: customerNo,
                        defaultcard: defaultcard,
                        loanref: loanref,
                    },
                    headers: {
                        "X-TENANTID": X_TENANTID,
                    },
                }
            )
            .then((response) => {
                res.data = response.data;
                res.status = response.status;
                console.log(response);
                return res;
            })
            .catch((err) => {
                console.log(err.response.data);
                res.status = err.response.status;
                res.code = err.code;
                return res;
            });
    },

    async getAllCards(customerNo: string): Promise<GetCardsInfoResponse> {
        return await axios
            .get("/isslapi/ibank/api/v1/getLoanRepaymentCardAuthorization", {
                params: { customerno: customerNo },
            })
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].authorizationData = JSON.parse(
                        response.data[i].authorizationData
                    );
                }
                return response.data;
            });
    },

    async deleteCard({
        customerNo,
        cardId,
    }: {
        customerNo: string;
        cardId: string;
    }) {
        const res: {
            status: number | null;
            data:
                | {
                      ok: boolean;
                  }
                | Record<string, any>;
            code: string;
        } = { status: null, data: {}, code: "" };

        return await axios
            .post(
                "/isslapi/ibank/api/v1/deleteLoanRepaymentCardAuthorization",
                {},
                {
                    params: {
                        customerno: customerNo,
                        id: cardId,
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
                return res;
            });
    },
};

export default cardRequest;

// async function start(){
//     await cardRequest.addCard({
//         authdata: `{"id":2117944342,"domain":"test","status":"success","reference":"1663677210993","amount":5000,"message":null,"gateway_response":"Successful","paid_at":"2022-09-20T12:33:42.000Z","created_at":"2022-09-20T12:33:36.000Z","channel":"card","currency":"NGN","ip_address":"102.67.1.17","metadata":{"referrer":"http://localhost:3000/add-card"},"log":{"start_time":1663677217,"time_spent":6,"attempts":1,"errors":0,"success":true,"mobile":false,"input":[],"history":[{"type":"action","message":"Attempted to pay with card","time":4},{"type":"success","message":"Successfully paid with card","time":6}]},"fees":75,"fees_split":null,"authorization":{"authorization_code":"AUTH_uvohk0wgc6","bin":"408408","last4":"4081","exp_month":"12","exp_year":"2030","channel":"card","card_type":"visa ","bank":"TEST BANK","country_code":"NG","brand":"visa","reusable":true,"signature":"SIG_Iwd3K5NlbFqfDoGPw1A0","account_name":null,"receiver_bank_account_number":null,"receiver_bank":null},"customer":{"id":86652567,"first_name":"ANJOLAOLUWA","last_name":"AKINDIPE","email":"anjyakindipe@gmail.com","customer_code":"CUS_qh8su89i9d0bdh7","phone":"+2347030444529","metadata":{},"risk_action":"default","international_format_phone":"+2347030444529"},"plan":null,"split":{},"order_id":null,"paidAt":"2022-09-20T12:33:42.000Z","createdAt":"2022-09-20T12:33:36.000Z","requested_amount":5000,"pos_transaction_data":null,"source":null,"fees_breakdown":null,"transaction_date":"2022-09-20T12:33:36.000Z","plan_object":{},"subaccount":{}}`,
//         customerNo: "9454",
//         defaultcard: false,
//         loanref: "2",
//     });
// }

// start()
