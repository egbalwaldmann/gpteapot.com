// 🧪 Technical Summary: This configuration file sets up Vite for a React project, includes the React plugin, specifies the build target to be 'esnext', and provides a rewrite rule for handling client-side routing. 🛠️

// 🎡 Non-Technical Summary: This file is like the blueprint for a fun amusement park (the application). It helps us set up the tools and attractions (React, build settings) to make sure everything runs smoothly and visitors can enjoy their time. 🌈

// 📦 Import necessary modules
import { defineConfig } from "vite"; // 🧰 Import Vite's 'defineConfig' function
import react from "@vitejs/plugin-react"; // 🎈 Import the Vite React plugin

// 🌐 Configure Vite for our project
// https://vitejs.dev/config/
export default defineConfig({
  // 🔌 Add plugins
  plugins: [react()], // 🧩 Include the React plugin

  // 🏗️ Define build settings
  build: {
    target: "esnext", // 🎯 Set the build target to 'esnext'
  },

  // 🔄 Handle client-side routing
  rewrites: [
    { source: "/(.*)", destination: "/" }, // 🚦 Rewrite rule for handling client-side routes
  ],
});
