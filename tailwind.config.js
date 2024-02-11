/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xs: "10px",
      sm: "12px",
    },
    extend: {
      gridTemplateColumns: {
        "30/70": "30% 70%",
      },
    },
  },
  plugins: [require("daisyui")],
};
