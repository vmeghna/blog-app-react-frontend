import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BlogsProvider } from "./context/BlogsContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogsProvider>
        <App />
      </BlogsProvider>
    </AuthProvider>
  </React.StrictMode>
);
