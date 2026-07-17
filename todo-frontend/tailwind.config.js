/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",      // Deep dark slate
        surface: "#1e293b",         // Slightly lighter for cards/inputs
        textPrimary: "#f8fafc",     // Almost white
        textSecondary: "#94a3b8",   // Muted gray
        accent: {
          DEFAULT: "#f97316",       // Vibrant orange
          hover: "#ea580c",         // Darker orange for hover states
        },
      },
    },
  },
  plugins: [],
};