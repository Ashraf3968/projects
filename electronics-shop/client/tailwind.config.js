/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#07111f",
        ink: "#0f172a",
        panel: "#0f1a2b",
        accent: "#16a34a",
        signal: "#38bdf8",
        gold: "#f59e0b"
      },
      boxShadow: {
        soft: "0 25px 80px rgba(2, 12, 27, 0.35)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(56,189,248,0.22), transparent 34%), radial-gradient(circle at top right, rgba(22,163,74,0.18), transparent 30%), linear-gradient(135deg, #020617 0%, #081120 55%, #0f172a 100%)"
      }
    }
  },
  plugins: []
};
