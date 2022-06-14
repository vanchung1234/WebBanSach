import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DataProvider from './redux/store'
import "./styles/global.css";
import reportWebVitals from "./reportWebVitals";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,

};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <DataProvider>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </DataProvider>

);

reportWebVitals();