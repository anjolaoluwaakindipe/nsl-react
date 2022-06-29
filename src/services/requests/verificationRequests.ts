import axios from "axios";
export const verificationRequests = {
    generateVerificationCode: ():string => {
        const digit = Math.floor(100000 + Math.random() * 999999);

        const code = digit.toString().substring(1,5);

        if (code.length !==4){
            return verificationRequests.generateVerificationCode()
        }

        return code
    },

    // request to send verification sms
    verifySms: async ({
        fourDigitCode,
        recipient,
    }: {
        fourDigitCode: string;
        recipient: string;
    }) => {
        // sms text
        let message = `Good day,\n\nPlease input this verification code to verify your phone number: ${fourDigitCode}\n\nPlease note that your account will only be created once your email and phone number is verified
        `;
        return await axios.get(
            "/isslapi/onboarding-api/1.0/sendsms",
            ///
            {
                params: {
                    message,
                    recipient,
                },
            }
        );
    },

    // request to send verfication email
    verifyEmail: async ({
        fourDigitCode,
        toEmail,
    }: {
        fourDigitCode: string;
        toEmail: string;
    }) => {
        // email body
        let message = `
        Good day,\n\n
        Please input this verification code to verify your phone number: ${fourDigitCode}\n\n
        Please note that your account will only be created once your email and phoneNumber is verified
        `;

        const body = {
            attachments: [{}],
            body: message,
            from: "mailsend@isslng.com",
            subject: "string",
            to: toEmail,
        };

        return await axios.post("/isslapi/onboarding-api/1.0/sendmail", body);
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
