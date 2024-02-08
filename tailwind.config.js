/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xs: "0.7rem",
      sm: "0.8rem",
    },
    extend: {
      gridTemplateColumns: {
        "30/70": "30% 70%",
      },
    },
  },
  plugins: [require("daisyui")],
};
