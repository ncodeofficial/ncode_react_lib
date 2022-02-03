import React from "react";
import ReactDOM from "react-dom";
import App from "./application/App";
import { AppConfiguration } from "./application/AppConfiguration";
import { BrowserRouter } from "react-router-dom";
import { NCApplicationContext } from "@ncodedcode/ncode_react_lib";

NCApplicationContext.createContext(new AppConfiguration());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
