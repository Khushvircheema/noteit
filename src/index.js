import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.Node_ENV === "production") disableReactDevTools();
const root = createRoot(document.getElementById("root"));
root.render(<App />);
