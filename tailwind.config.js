const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    content: [],
    theme: {
        extend: {
            colors: {
                bgColor: "#FAFAFA",
                contColor: "#FFFEFE",
                darkTextColor: "#000000",
                primaryColor: "#737373",
                accentColor: "rgba(0, 0, 0, 0.6)",
                underlineColor: "rgba(226, 210, 209, 1)",
            },
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
