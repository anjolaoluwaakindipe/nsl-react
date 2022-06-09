import axios from "axios";
export const verificationRequests = {
    verifySms: async ({
        fourDigitCode,
        recipient,
    }: {
        fourDigitCode: string;
        recipient: string;
    }) => {
        let message = `
        Good day,\n\n
        Please input this verification code to verify your phone number: ${fourDigitCode}\n\n
        Please note that your account will only be created once your email and phoneNumber is verified
        `;
        return await axios.get(
            "http://api.issl.ng:7777/onboarding-api/1.0/sendsms",
            {
                params: {
                    message,
                    recipient,
                },
            }
        );
    },

    verifyEmail: async ({
        fourDigitCode,
        toEmail,
    }: {
        fourDigitCode: string;
        toEmail: string;
    }) => {
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

        return await axios.post(
            "http://api.issl.ng:7777/onboarding-api/1.0/sendmail",
            body
        );
    },
};

function doWork() {
  verificationRequests.verifyEmail({
      fourDigitCode: "1234",
      toEmail: "anjyakindipe@gmail.com",
  });
}

console.log(
  
);
