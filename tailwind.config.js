const { default: daisyui } = require("daisyui");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#FF5722",
        brandBlue: "#0048ff",
      },
    },
  },
  plugins: [daisyui],
}
