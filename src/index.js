import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <LoaderProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoaderProvider>
    </ThemeProvider>
  </Provider>
);
