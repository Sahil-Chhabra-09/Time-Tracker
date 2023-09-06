import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./state/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const blob = document.getElementById("blob");

function moveBlob(event) {
  const { clientX, clientY } = event;
  blob.animate(
    {
      top: `${clientY}px`,
      left: `${clientX}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
}

if (window.innerWidth >= 650) {
  console.log(window);
  window.onpointermove = moveBlob;
} else {
  window.onpointermove = null;
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
