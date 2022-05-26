const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    content: [],
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
                bgColor2: "rgba(241, 241, 241, 1)",
            },
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {
            opacity: ["disabled"],
        },
    },
    plugins: [],
};
