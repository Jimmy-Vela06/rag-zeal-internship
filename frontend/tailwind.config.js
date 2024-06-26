/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#003554",
      },
      maxWidth: {
        "700px": "700px",
      },
    },
  },
  plugins: [],
};
