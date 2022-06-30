// /** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bgColor: "#FAFAFA",
                contColor: "#FFFEFE",
                darkTextColor: "#000000",
                bgColor2: "rgba(250, 250, 250, 1)",
                primaryColor: "rgba(109, 32, 27, 1)",
                secondaryColor: "rgba(252, 197, 12, 1)",
                accentColor: "rgba(0, 0, 0, 0.6)",
                underlineColor: "rgba(226, 210, 209, 1)",
                successColor: "rgba(23, 120, 7, 1)",
                bgColor3: "#E5E5E5",
                peach: "#FFFCF0",
                lightPink: "rgba(109, 32, 27, 0.14)"
            },
            fontFamily: {
                sans: ["Poppins"],
            },
        },
    },
    plugins: [],
};
