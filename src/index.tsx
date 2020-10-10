import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./global.css";

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/service-worker.js");
  });
}

ReactDOM.render(<App />, document.querySelector("#root"));
