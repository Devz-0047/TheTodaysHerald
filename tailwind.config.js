/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scans files for Tailwind classes
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Roboto",
          "Open Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ], // Sans-serif fonts
        serif: ["Georgia", "Merriweather", "ui-serif", "serif"], // Serif fonts
      },
    },
  },
  plugins: [],
};
