// main.jsx
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const clerkFrontendApi = ""; // Replace with your Clerk frontend API key

createRoot(document.getElementById("root")).render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
