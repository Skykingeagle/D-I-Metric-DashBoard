import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import { setLogin } from "state";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  preloadedState: {
    global: {
      mode: "dark",
      user: user || null,
      token: token || null,
    },
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// If user and token are present, dispatch the setLogin action to update the state
if (user && token) {
  store.dispatch(setLogin({ user, token }));
}

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
