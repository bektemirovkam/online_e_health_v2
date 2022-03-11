import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "antd/dist/antd.min.css";
import "./styles/globals.css";

import App from "./App";
import { setupStore } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
