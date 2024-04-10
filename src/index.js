import React from "react";
import ReactDOM from "react-dom/client";
import "./css/html5reset.css";
import "material-symbols";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
root.render(
  <React.StrictMode>
    <App isDesktop={isDesktop} />
  </React.StrictMode>
);
