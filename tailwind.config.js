/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gym: {
          bg: "#20252B",
          sidebar: "#171B20",
          panel: "#252B32",
          card: "#2B3239",
          elevated: "#343C44",
          accent: "#E53946",
          accentSoft: "rgba(229, 57, 70, 0.18)",
          secondary: "#13A6A0",
          success: "#13A6A0",
          successSoft: "rgba(19, 166, 160, 0.18)",
          text: "#FFFFFF",
          muted: "#B5BDC5",
          border: "#414A53",
          warning: "#FBBF24",
          danger: "#FB7185",
        },
      },
      boxShadow: {
        soft: "0 18px 40px rgba(19, 20, 28, 0.45)",
        glow: "0 0 0 1px rgba(229,57,70,0.26), 0 18px 32px rgba(229,57,70,0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
