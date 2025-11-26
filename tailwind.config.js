// tailwind.config.js
const { default: daisyui } = require("daisyui");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // keep your brand colors — adjust if needed
        primary: "#FF8A00", // example orange shade aligned with NexCart
        secondary: "#FF5722",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"], // restrict themes to minimize CSS
  },
};
