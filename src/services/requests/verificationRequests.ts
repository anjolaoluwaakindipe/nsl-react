import axios from "axios";
import { X_TENANTID } from "./authSettings";

// verificationMessage type
type VerificationMessageType = "normal" | "loancontract";

export const verificationRequests = {
    generateVerificationCode: (): string => {
        const digit = Math.floor(100000 + Math.random() * 999999);

        const code = digit.toString().substring(1, 5);

        if (code.length !== 4) {
            return verificationRequests.generateVerificationCode();
        }

        return code;
    },

    // request to send verification sms
    verifySms: async (
        {
            fourDigitCode,
            recipientPhoneNumber: recipient,
        }: {
            fourDigitCode: string;
            recipientPhoneNumber: string;
        },
        messageType: VerificationMessageType = "normal",
        firstName: string = ""
    ) => {
        // sms text

        let message;
        switch (messageType) {
            case "loancontract":
                message = `Good day ${firstName},\n\nPlease input this verification code to verify that you agree to our terms and agreement for your loan contract: ${fourDigitCode}\n\n
        `;

                break;
            case "normal":
                message = `Good day ,\n\nPlease input this verification code to verify your phone number: ${fourDigitCode}\n\nPlease note that your account will only be created once your email and phone number is verified
        `;
        }
        return await axios.get(
            "/isslapi/onboarding-api/1.0/sendsms",
            ///
            {
                params: {
                    message,
                    recipient,
                },
                headers: {
                    "X-TENANTID": X_TENANTID,
                },
            }
        );
    },

    // request to send verfication email
    verifyEmail: async (
        {
            fourDigitCode,
            toEmail,
        }: {
            fourDigitCode: string;
            toEmail: string;
        },
        messageType: VerificationMessageType = "normal",
        firstName: string = ""
    ) => {
        // email body

        let message;
        switch (messageType) {
            case "loancontract":
                message = `Good day ${firstName},\n\nPlease input this verification code to verify that you agree to our terms and agreement for your loan contract: ${fourDigitCode}\n\n`;
                break;
            case "normal":
                message = `Good day ${firstName},\n\nPlease input this verification code to verify your email: ${fourDigitCode}\n\nPlease note that your account will only be created once your email and phoneNumber is verified`;
                break;
        }

        const body = {
            attachments: [{}],
            body: message,
            from: "mailsend@isslng.com",
            subject: "string",
            to: toEmail,
        };

        return await axios.post("/isslapi/onboarding-api/1.0/sendmail", body, {
            headers: { "X-TENANTID": X_TENANTID },
        });
    },
};

// const doWork = async() =>{
//     const response= await verificationRequests.verifySms({
//         fourDigitCode: verificationRequests.generateVerificationCode(),
//         recipient: "2347030444529"
//     }).then(res=> res).catch(err=>err);

//     console.log(response);
// }

// doWork()
