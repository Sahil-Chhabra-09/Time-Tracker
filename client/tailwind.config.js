/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        indigo: "#001C30",
        ocean: "#176B87",
        mint: "#DAFFFB",
        pending: "rgba(255, 255, 0, 0.2)",
        inProgress: "rgba(255, 165, 0, 0.2)",
        completed: "rgba(0, 128, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

//bg-cyan-900
