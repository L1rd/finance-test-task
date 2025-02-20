// Libs
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Components
import App from "./App";
// Store
import store from "store/root";

import reportWebVitals from "./reportWebVitals";

// Styles
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
