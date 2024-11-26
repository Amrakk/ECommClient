/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                stroke: "#E2E8F0",
                primary: "#000000",

                meta: {
                    1: "#DC3545",
                    2: "#EFF2F7",
                    3: "#10B981",
                    4: "#313D4A",
                    5: "#4B5563",
                    6: "#FFBA00",
                    7: "#FF6766",
                    8: "#F0950C",
                    9: "#E5E7EB",
                    10: "#0FADCF",
                },
            },
            boxShadow: {
                default: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
            },
            fontSize: {
                "title-xxl": ["44px", "55px"],
                "title-xl": ["36px", "45px"],
                "title-xl2": ["33px", "45px"],
                "title-lg": ["28px", "35px"],
                "title-md": ["24px", "30px"],
                "title-md2": ["26px", "30px"],
                "title-sm": ["20px", "26px"],
                "title-xsm": ["18px", "24px"],
            },
        },
    },
    plugins: [],
};
