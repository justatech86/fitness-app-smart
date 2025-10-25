export default {
  content: ["./index.html", "./*.{js,jsx}", "./components/**/*.{js,jsx}", "./utils/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B6F47",       // Warm caramel brown
        accent: "#7A8450",        // Olive green
        neutralBg: "#F5F1E8",     // Warm sand/beige
      },
    },
  },
  plugins: [],
};